import pymysql
# import environ
import os
from pathlib import Path
from typing import *
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from dotenv import dotenv_values


class Interface:
    cleansed_data: dict = {}
    cursor: pymysql.Connection.cursor = None
    origin_db_cursor : pymysql.Connection.cursor = None
    db: pymysql.connections.Connection = None
    setter: pymysql.Connection.cursor = None
    getter: pymysql.Connection.cursor = None

    # column_names: List[str] = ''

    def __init__(self):
        # database connection
        # env = environ.Env()
        # BASE_DIR = Path(__file__).resolve().parent
        # environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

        # load env variables. This replaces environ.
        env = dotenv_values(".env")
        HOST, PORT, SCHEMA, DB_USER, PASSWORD = env["HOST"], int(env["PORT"]), "replica_sosweet", env["DB_USER"], env["PASSWORD"]
        # HOST, PORT, SCHEMA, DB_USER, PASSWORD = env["HOST"], int(env["PORT"]), env["REPLICA_SCHEMA"], env["DB_USER"], env["PASSWORD"]
        ORIGIN_SCHEMA = "sosweet"
        # ORIGIN_SCHEMA = env["ORIGIN_SCHEMA"]
        self.db = pymysql.connect(host=HOST, port=PORT, user=DB_USER, password=PASSWORD, db=SCHEMA, charset="utf8")
        self.db.autocommit(True)
        self.setter = self.db.cursor()
        self.getter = self.db.cursor()
        self.origin = pymysql.connect(host=HOST, port=PORT, user=DB_USER, password=PASSWORD, db=ORIGIN_SCHEMA, charset="utf8")
        self.origin.autocommit(True)
        self.origin_cursor = self.origin.cursor()

    def test(self):
        return {'message': 'CORS TEST SUCCESSFUL'}

    def keep_alive(self):
        self.getter.execute("SHOW TABLES")
        self.getter.fetchall()
        self.origin_cursor.execute("SHOW TABLES")
        self.origin_cursor.fetchall()
        # print('db connection keep alive')
        return self.getter.fetchall()

    def clone_to_replica(self):
        # print('레플리카 DB 복제 시작')
        try:
            # 커서 생성
            source_cursor = self.origin_cursor
            target_cursor = self.getter

            # 원본 스키마의 테이블 목록 가져오기
            source_cursor.execute("SHOW TABLES")
            tables = source_cursor.fetchall()

            for table in tables:
                print(table)
                table_name = table[0]
                if table_name == 'remaining_time':
                    continue

                # 원본 스키마의 테이블을 대상 스키마로 복제
                # if table in ['timetable, used_table']:
                #     select_qeury = f"SELECT * FROM {table_name}"
                # else:
                #     select_qeury = f"SELECT * FROM {table_name}"
                select_qeury = f"SELECT * FROM {table_name} where valid = 'Y'"

                if table_name in ['timetable', 'used_table']:
                    select_qeury += ' AND id > 1704010703082'

                if table_name == 'paid':
                    select_qeury += " AND  date > '2024-01-01'"

                source_cursor.execute(select_qeury)
                rows = source_cursor.fetchall()

                # 테이블 생성
                # target_cursor.execute(f"CREATE TABLE IF NOT EXISTS replica_sosweet.{table_name} LIKE sosweet.{table_name}")

                target_cursor.execute(f"DELETE FROM replica_sosweet.{table_name}")

                # 데이터 복사
                for row in rows:
                    row = [value if value is not None else 'NULL' for value in row]
                    row = [str(value) if 'datetime' in str(type(value)) else value for value in row]
                    if table_name == 'dogs':
                        row[4] = '010-0000-0000'
                
                    row = str(row).replace('[', '(').replace(']', ')').replace("'NULL'", "NULL")
                    # print(table, row)
                    insert_query = f"INSERT INTO replica_sosweet.{table_name} VALUES {row}"
                    # if table_name == 'timetable' :
                    #     print(insert_query)
                    target_cursor.execute(insert_query)

            # 커밋
            self.db.commit()
            
            # print(datetime.now())
            # print("스키마 복제가 완료되었습니다.")

        except Exception as e:
            print(f"오류 발생: {str(e)}")
        return "레플리카 클론 완료"

    def get_allergy(self, name):
        # name, allergy = data['name'], data['allergy']
        # has_allergy = 1
        # if not data['allergy']:
        #     has_allergy = 0
        select_query = f"""
                select allergy 
                from dogs
                where name = '{name}'
            """
        self.getter.execute(select_query)
        allergy = self.getter.fetchone()[0]

        return allergy if allergy else ''

    # def update_allergy(self, data):
    #     name, allergy = data['name'], data['allergy']
    #     has_allergy = 1
    #     if not data['allergy']:
    #         has_allergy = 0
    #     insert_query = f"""
    #     update dogs
    #     set allergy = '{allergy}',
    #     has_allergy = {has_allergy}
    #     where name = '{name}'
    #     """
    #     # print(insert_query)
    #     self.setter.execute(insert_query)
    #     self.db.commit()
    #     return True

    def add_profile(self, name, file_id):
        update_query = f"""
        UPDATE dogs
        SET profile_id = '{file_id}'
        WHERE name = '{name}'
        """
        # print('add profile')
        # print(update_query)
        self.setter.execute(update_query)
        self.db.commit()
        return True

    def get_profile(self, name):
        select_query = f"""
        SELECT profile_id
        FROM dogs
        WHERE name = '{name}'
        """
        # print('get profile')
        # print(select_query)
        self.getter.execute(select_query)
        file_id = self.getter.fetchone()[0]
        # print(file_id)
        if file_id:
            return f'https://imagedelivery.net/zD0Crtd4n6Z3fD7_la_iRQ/{file_id}/public'
        else:
            return None

    # dogs
    def add_dog_info(self, data):
        # print(data)
        duplicate_check_query = f"select count(*) from dogs where name = '{data['dogName']}'"
        self.getter.execute(duplicate_check_query)
        # return False
        # print()
        # print(duplicate_check_query)
        if self.getter.fetchone()[0] > 0:
            return False

        if data['allergy']:
            data['hasAllergy'] = 1
        else:
            data['hasAllergy'] = 0
            data['allergy'] = ''

        insert_query = f"""
        INSERT INTO dogs (name, breed, note, gender, phone, weight, official_name, hasAllergy, allergy)
        VALUES (
        '{data['dogName']}',
        '{data['dogBreed']}',
        '{data['dogInfo']}',
        '{data['dogGender']}',
        '{data['phone']}',
        '{data['dogWeight']}',
        '{data['officialName']}',
        {data['hasAllergy']},
        '{data['allergy']}'
        )
        """
        self.setter.execute(insert_query)
        self.db.commit()
        return True

    def mod_history(self, data):
        # data will be like
        # id
        # name
        # in_time
        # out_time
        # belts
        # date
        # minutes
        # check_today
        # update data from used_table where id=id
        in_time = data['date'] + ' ' + data['in_time']
        out_time = data['date'] + ' ' + data['out_time']
        target_table = ['used_table', 'timetable']
        for target in target_table:
            update_query = f"""
            UPDATE {target}
            SET
            in_time = '{in_time}',
            out_time = '{out_time}',
            belts = {data['belts']},
            date = STR_TO_DATE('{data['date'].replace('-', '')}', '%Y%m%d') 
            WHERE id = {data['id']}
            """
            # print(update_query)
            self.setter.execute(update_query)
            self.db.commit()
        if self.reset_used_minutes(data['id']):
            return True

    def get_dogs_list(self):
        query = f"""
        SELECT d.*, 
        ifnull(SUM(p.minutes), 0) - ifnull(SUM(u.used_minutes), 0) AS remaining_minutes,
        ifnull(a.url, null) as album_url,
        ifnull(a.shared_url, null) as shared_url
        FROM dogs d
        LEFT JOIN album a ON d.name = a.name AND a.valid = 'Y'
        LEFT JOIN (select name, sum(minutes) as minutes from paid where valid = 'Y' group by name) p ON d.name = p.name
        LEFT JOIN (select name, sum(used_minutes) as used_minutes
        from used_table
        where valid = 'Y'
#         AND checked = 0
        group by name) u ON d.name = u.name
        GROUP BY d.name;
        """
        # query = f"select dogs.*, remaining_time.minutes " \
        #         f"from dogs inner join remaining_time " \
        #         f"on dogs.name = remaining_time.name " \
        #         f"order by name;"
        self.getter.execute(query)
        columns = [col[0] for col in self.getter.description]  # Get column names
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data

    def get_dog_info(self, name):
        query = f"select * from dogs where name = '{name}' AND valid='Y' "
        self.getter.execute(query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        converted_data = []
        for row in data:
            converted_row = {}
            for key, value in row.items():
                converted_row[key] = value
                converted_row['remaining_minutes'] = self.get_remaining_minutes(converted_row['name'])
                converted_row['used_belts'] = self.get_used_belts(converted_row['name'])
                converted_row['last_visited'] = self.get_last_visited(converted_row['name'])
            converted_data.append(converted_row)
            # print(f'converted row of {name} : {converted_row}')
        return converted_data[0]

    def mod_dog_info(self, data):
        # update table
        print(data)

        if data['allergy']:
            data['hasAllergy'] = 1
        else:
            data['hasAllergy'] = 0
            data['allergy'] = ''

        update_query = f"""
        UPDATE dogs
        SET
        breed = '{data['dogBreed']}',
        note = '{data['dogInfo']}',
        gender = '{data['dogGender']}',
        phone = '{data['phone']}',
        weight = '{data['dogWeight']}',
        official_name = '{data['officialName']}',
        hasAllergy = {data['hasAllergy']},
        allergy = '{data['allergy']}'
        WHERE name='{data['name']}'
        """
        # print(update_query)
        self.setter.execute(update_query)
        self.db.commit()
        return True

    def get_last_visited(self, name):
        select_qeury = f"select date from used_table where name = '{name}' and valid='Y' order by id desc limit 1"
        self.getter.execute(select_qeury)
        data = self.getter.fetchone()
        if data and len(data) > 0:
            data = data[0].strftime('%y년 %m월 %d일').replace(" 0", " ")
        else:
            data = ''
        # print(data)
        return data

    def del_dog_info(self, name):
        pass

    # timetable
    def get_table(self, date):
        select_query = f"SELECT * FROM timetable WHERE date = '{date}' and out_time is NULL AND valid='Y' ORDER BY in_time"
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]  # Get column names
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        converted_data = []
        for row in data:
            converted_row = {}
            for key, value in row.items():
                if key == 'in_time' or key == 'out_time':
                    if value is not None:
                        converted_row[key] = value.strftime('%H:%M')
                    else:
                        converted_row[key] = ''
                else:
                    converted_row[key] = value
            converted_row['remaining_minutes'] = self.get_remaining_minutes(converted_row['name'])
            converted_data.append(converted_row)
        return converted_data

    # timetable
    def get_checkout_timetable(self, date):
        select_query = f"SELECT * FROM timetable WHERE date = '{date}' AND out_time is not NULL AND valid='Y' ORDER BY in_time"
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]  # Get column names
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        # print(data)
        converted_data = []
        for row in data:
            converted_row = {}
            for key, value in row.items():
                if key == 'in_time' or key == 'out_time':
                    converted_row[key] = value.strftime('%H:%M')
                else:
                    converted_row[key] = value
            converted_row['remaining_minutes'] = self.get_remaining_minutes(converted_row['name'])
            converted_data.append(converted_row)
        return converted_data

        # return [dict(zip(columns, row)) for row in self.getter.fetchall()]

    # used_table
    def get_history_nonchecked(self):
        # select_query = f"SELECT * FROM used_table WHERE checked != 1 AND valid='Y' ORDER BY name, date"
        # select_query = f"""SELECT
        #                     name,
        #                     COUNT(*) AS counts,
        #                     GROUP_CONCAT(id) AS ids
        #                     FROM used_table
        #                     WHERE checked != 1 AND valid = 'Y'
        #                     GROUP BY name
        #                     ORDER BY name;
        #                 """
        select_query = f"""WITH UsedTableAgg AS (
                            SELECT
                            name,
                            COUNT(*) AS counts,
                            GROUP_CONCAT(id) AS ids
                            FROM used_table
                            WHERE checked != 1 AND valid = 'Y'
                            GROUP BY name
                            ),
                            PaidUsedMinutes AS (
                            SELECT
                            d.name,
                            IFNULL(SUM(p.minutes), 0) - IFNULL(SUM(u.used_minutes), 0) AS remaining_minutes
                            FROM dogs d
                            LEFT JOIN (SELECT name, SUM(minutes) as minutes FROM paid WHERE valid = 'Y' GROUP BY name) p ON d.name = p.name
                            LEFT JOIN (SELECT name, SUM(used_minutes) as used_minutes FROM used_table WHERE valid = 'Y' GROUP BY name) u ON d.name = u.name
                            GROUP BY d.name
                            )
                            SELECT
                                d.name,
                                uta.counts,
                                uta.ids,
                                pum.remaining_minutes,
                                IFNULL(a.url, null) as url
                            FROM dogs d
                                LEFT JOIN album a ON d.name = a.name
                                LEFT JOIN UsedTableAgg uta ON d.name = uta.name
                                LEFT JOIN PaidUsedMinutes pum ON d.name = pum.name
                            WHERE counts > 0
                            ORDER BY d.name;
                        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        # print(data)
        return data

    def get_unchecked_used_list(self):
        query = f"""
        SELECT name FROM used_table WHERE checked != 1 AND valid='Y' GROUP BY name ORDER BY name
        """
        self.getter.execute(query)
        columns = [col[0] for col in self.getter.description]  # Get column names
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data

    # used_table
    def get_history(self, name, get_message=False):
        if get_message:
            select_query = f"SELECT * FROM used_table WHERE name = '{name}' and checked != 1 AND valid='Y' ORDER BY date DESC"
        elif name == 'ALL':
            select_query = f"SELECT * FROM used_table WHERE valid='Y' ORDER BY date DESC LIMIT 30"
        else:
            select_query = f"SELECT * FROM used_table WHERE name = '{name}' AND valid='Y' ORDER BY date DESC"
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        # print(data)
        converted_data = []
        for row in data:
            converted_row = {}
            for key, value in row.items():
                if key == 'in_time' or key == 'out_time':
                    # print(value)
                    converted_row[key] = self.convert_to_hhmm(value)
                else:
                    converted_row[key] = value
            # converted_row['remaining_minutes'] = self.get_remaining_minutes(converted_row['name'])
            converted_data.append(converted_row)
        return converted_data
        # print(data)

    def get_pay_history(self):
        select_query = f"SELECT * FROM paid WHERE valid='Y' ORDER BY date DESC"
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        # print(data)
        return data

    def check_in(self, data):
        name, date, in_time, row_id = data['name'], data['date'], data['in_time'], data['id']
        # in_time 15:55
        # date 2021-08-01
        in_time = date + ' ' + in_time
        insert_query = f"""
        insert into timetable (name, in_time, date, id, belts)
        values ('{name}',
        '{in_time}',
        STR_TO_DATE('{date.replace('-', '')}', '%Y%m%d'),
        {row_id},
        0
        );
        """
        # print(insert_query)
        self.setter.execute(insert_query)
        self.db.commit()
        return True

    def check_out(self, data):
        name, date, in_time, out_time, belts, row_id, check_today = \
            data['name'], data['date'], data['in_time'], data['out_time'], data['belts'], data['id'], data['payToday']
        # insert data into used
        used_minutes = 0 if check_today else data['minutes']
        insert_query = f"""
        insert into used_table (name, date, used_minutes, id, belts, checked, in_time, out_time)
        values (
        '{name}',
        STR_TO_DATE('{date.replace('-', '')}', '%Y%m%d'),
        {used_minutes},
        {row_id},
        {belts},
        0,
        '{date + ' ' + in_time}',
        '{date + ' ' + out_time}'
        );
        """
        # print(insert_query)
        self.setter.execute(insert_query)
        self.db.commit()
        if check_today:
            update_query = f"""
            update used_table
            set checked = 1,
            checked_date = STR_TO_DATE('{date.replace('-', '')}', '%Y%m%d'),
            checked_belts = 1
            where id = {row_id};
            """
            # 당일결제시 매너벨트도 같이 결제됨
            # print(update_query)
            self.setter.execute(update_query)
            self.db.commit()

        # set timetable out_time, belts with id
        update_query = f"""
        update timetable
        set out_time = '{date + ' ' + out_time}'
        , belts = {belts}
        , paid_today = {1  if check_today else 0}
        where id = {row_id};
        """
        # print(update_query)
        self.setter.execute(update_query)
        self.db.commit()

        if belts:
            self.set_belt(row_id, belts)

        # self.get_remaining_time(name)
        # self.subtract_time(name, used_minutes)

        return True

    def get_used_row_info(self, row_id):
        select_query = f"""
        SELECT * FROM used_table WHERE id = {row_id}
        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data[0]

    def sum_paid_time(self, name):
        select_query = f"""
        select sum(minutes) as minutes
        from paid
        where name = '{name}'
        AND valid='Y' 
        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data[0]['minutes']

    def sum_used_time(self, name):
        select_query = f"""
        select sum(used_minutes) as minutes
        from used_table
        where name = '{name}'
        AND valid='Y' 
        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data[0]['minutes']

    def get_remaining_time(self, name):
        paid = self.sum_paid_time(name)
        used = self.sum_used_time(name)
        if paid is None:
            paid = 0
        if used is None:
            used = 0
        return paid - used

    def get_id_info(self, row_id):
        select_query = f"""
        SELECT * FROM timetable WHERE id = {row_id}
        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data[0]

    # def subtract_time(self, name, minutes):
    #     update_query = f"""
    #     update remaining_time
    #     set minutes = minutes - {minutes}
    #     where name = '{name}';
    #     """
    #     print(update_query)
    #     self.setter.execute(update_query)
    #     self.db.commit()
    #     return True

    def reset_used_minutes(self, row_id):
        timeset_query = f"""
        UPDATE used_table
        SET used_minutes = TIMESTAMPDIFF(MINUTE, in_time, out_time)
        WHERE id = {row_id};
        ;
        """
        # print(timeset_query)
        self.setter.execute(timeset_query)
        self.db.commit()

        return True

    # change check-in time
    def change_check_in_time(self, data):
        name, date, in_time, row_id, in_or_out = data['name'], data['date'], data['in_time'], data['id'], data['in_or_out']
        # in_time form 15:55
        # date form 2021-08-01
        in_time = date + ' ' + in_time
        target_tables = ['timetable', 'used_table']
        for target in target_tables:
            update_query = f"""
            update {target}
            set {in_or_out}_time = '{in_time}'
            where id = {row_id};
            """
            # print(update_query)
            self.setter.execute(update_query)
            self.db.commit()

        if self.reset_used_minutes(row_id):
            return True

    def cancel_checkin(self, row_id):
        delete_query = f"""
        update timetable
        set valid='N' 
        where id = {row_id};
        """
        # print(delete_query)
        self.setter.execute(delete_query)
        self.db.commit()
        return True

    def cancel_history(self, row_id):
        target_table = ['used_table', 'timetable']
        for target in target_table:
            delete_query = f"""
            update {target}
            set valid='N' 
            where id = {row_id};
            """
            # print(delete_query)
            self.setter.execute(delete_query)
            self.db.commit()
        return True

    def cancel_pay(self, row_id):
        delete_query = f"""
        update paid
        set valid='N' 
        where id = {row_id};
        """
        # print(delete_query)
        self.setter.execute(delete_query)
        self.db.commit()
        return True

    def pay(self, data):
        name, hours, date = data['name'], data['hours'], data['date']
        # date form 2021-08-01
        # hours form 1
        # name form 'test'
        insert_query = f"""
        insert into paid (name, date, minutes)
        values (
        '{name}',
        STR_TO_DATE('{date.replace('-', '')}', '%Y%m%d'),
        {int(hours) * 60}
        );
        """
        # print(insert_query)
        self.setter.execute(insert_query)
        if self.add_remaining_time(data):
            self.db.commit()
        if data['isSwitchOn']:
            self.check_used_belts(name)
        return True

    def mod_pay(self, data):
        update_query = f"""
        update paid
        set minutes = {data['minutes']},
        date = STR_TO_DATE('{data['date'].replace('-', '')}', '%Y%m%d')
        where id = {data['id']};
        """
        # print(update_query)
        self.setter.execute(update_query)
        self.db.commit()
        return True

    def add_remaining_time(self, data):
        # there are name and minutes in data. update it to remaining_time. sum it.
        name, minutes = data['name'], int(data['hours']) * 60
        update_query = f"""
        update remaining_time
        set minutes = minutes + {minutes}
        where name = '{name}';
        """
        # print(update_query)
        self.setter.execute(update_query)
        return True

    def get_id_belt(self, row_id):
        select_query = f"""
        select belts from timetable
        where id = {row_id};
        """
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        belts = data[0]['belts']
        if not belts:
            return 0
        return belts

    def set_belt(self, row_id, belt):
        update_query = f"""
        update timetable
        set belts = {belt}
        where id = {row_id};
        """
        # print(update_query)
        self.setter.execute(update_query)
        self.db.commit()
        return True

    def get_used_belts(self, name):
        select_query = f"""
        select sum(belts) as belts from used_table
        where name = '{name}' and
        checked_belts is null
        AND valid='Y' 
        """
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        belts = data[0]['belts']
        if not belts:
            return 0
        return belts

    def check_used_belts(self, name):
        update_query = f"""
        update used_table
        set checked_belts = 1
        where name = '{name}' and
        checked_belts is null
        AND valid='Y' 
        """
        self.setter.execute(update_query)
        self.db.commit()
        return True

    def get_official_name(self, name):
        select_query = f"select official_name from dogs where name = '{name}';"
        self.getter.execute(select_query)
        official_name = self.getter.fetchone()[0]
        return official_name

    def get_remaining_minutes(self, name, message=False):
        condition = ' AND checked = 1' if message else ''
        query = f"""
        SELECT ifnull(SUM(p.minutes), 0) - ifnull(SUM(u.used_minutes), 0) AS remaining_minutes
        FROM dogs d
        LEFT JOIN (select name, sum(minutes) as minutes from paid where valid = 'Y' group by name) p ON d.name = p.name
        LEFT JOIN (select name, sum(used_minutes) as used_minutes
            from used_table
            where valid = 'Y'
            {condition}
            group by name) u ON d.name = u.name
        WHERE d.name = '{name}'
        GROUP BY d.name;
        """
        self.getter.execute(query)
        remaining_minutes = self.getter.fetchone()[0]
        if not remaining_minutes:
            return 0
        return remaining_minutes

    def convert_to_hhmm(self, input_time):
        if type(input_time) == str:
            dt_obj = datetime.strptime(input_time, '%Y-%m-%dT%H:%M:%S')
            time_str = dt_obj.strftime('%H:%M')
        else:
            time_str = input_time.strftime('%H:%M')
        return time_str

    def make_message(self, row_ids):
        select_query = f"""
        select name, date, in_time, out_time, used_minutes, belts from used_table
        where id in ({', '.join([str(row_id) for row_id in row_ids])});
        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        name = data[0]['name']
        shared_url = self.get_album(name)['shared_url']
        has_shared_url = True if shared_url else False

        official_name = self.get_official_name(name)
        remaining_minutes = self.get_remaining_minutes(name, message=True)
        # print(remaining_minutes)

        message = '안녕하세요~쏘스윗펫입니다😊\n'
        message += f'❤{official_name}❤놀이방 이용 내역 알려드립니다. \n'
        duration = relativedelta(minutes=remaining_minutes)
        # print(duration)
        # message += f'놀이방 남은 시간 : {abs(duration.days) * 24 + duration.hours}시간 {duration.minutes}분 \n\n'
        message += f'놀이방 남은 시간 : {"-" if remaining_minutes < 0 else ""}{abs(duration.days * 24 + duration.hours)}시간 {abs(duration.minutes)}분 \n\n'

        # 안녕하세요~쏘스윗펫입니다😊
        # ❤프로❤놀이방 이용 내역 알려드립니다.
        # 놀이방 남은 시간:19시간20분
        #
        # 3월25일 14:15-18:05(3:50)
        # 3월26일 15:00-19:00(4:00)
        # 4월1일 12:40-17:10(4:30)
        # 4월2일 14:00-16:10(2:10)
        #
        # 총 사용시간:14시간30분
        # 차감 후 남은 시간:4시간50분입니다.
        # 감사합니다🐶❤
        data = sorted(data, key=lambda x: x['date'])
        for row in data:
            date = row['date'].strftime('%-m월%-d일')
            in_time = row['in_time'].strftime('%H:%M')
            out_time = row['out_time'].strftime('%H:%M')
            used_minutes = row['used_minutes']
            belts = row['belts']
            used_time = str(timedelta(minutes=used_minutes))
            used_time = used_time[:-3]
            message += f'{date} {in_time}-{out_time} ({used_time}) \n'

        total_used_minutes = sum([row['used_minutes'] for row in data])
        # print(total_used_minutes)
        duration = relativedelta(minutes=total_used_minutes)
        # print(duration)
        message += f'\n총 사용시간 : {duration.days * 24 + duration.hours}시간 {duration.minutes}분 \n'

        remaining_minutes -= total_used_minutes
        duration = relativedelta(minutes=remaining_minutes)
        # print(duration)

        # message += f'놀이방 남은 시간 : {"-" if remaining_minutes < 0 else ""}{abs(duration.days * 24 + duration.hours)}시간 {abs(duration.minutes)}분 \n\n'
        message += f'차감 후 남은 시간 : {"-" if remaining_minutes < 0 else ""}{abs(duration.days * 24 + duration.hours)}시간 {abs(duration.minutes)}분 입니다. \n'
        if remaining_minutes < 0:
            message += f'다음에 오시면 충전부탁드려요~ \n'
        message += f'감사합니다🐶❤ \n'
        if has_shared_url:
            message += f'\n앞으로 사진 공유는 아래 링크로 확인해주세요~\n{shared_url}\n'
        
        # print(message)
        return message

    def check_used_date(self, row_ids):
        today = datetime.today().strftime('%Y-%m-%d')
        if not row_ids:
            return None
        update_query = f"""
        update used_table
        set checked = 1
        , checked_date = '{today}'
        where id in ({', '.join([str(row_id) for row_id in row_ids])});
        """
        # print(update_query)
        self.setter.execute(update_query)
        self.db.commit()
        return True

    def not_out_timetable(self):
        today = datetime.today().strftime('%Y-%m-%d')
        select_query = f"""
        select name, date, id
        from timetable
        where out_time is null
        and
        date != '{today}'
        and valid='Y'
        """
        # print(select_query)
        self.getter.execute(select_query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data

    def switch_history_to_paid(self, row_id):
        insert_query = f"""
        update used_table
        set checked = 1,
        used_minutes = 0,
        checked_belts = 1
        where id = {row_id};
        """
        # print(insert_query)
        self.setter.execute(insert_query)
        self.db.commit()

        time_table_query = f"""
        update timetable
        set paid_today = 1
        where id = {row_id};
        """
        # print(time_table_query)
        self.setter.execute(time_table_query)
        self.db.commit()

        return True

    def get_pay_belts_required(self):
        query = f"""
        SELECT name, SUM(belts) AS belts
        FROM used_table
        WHERE checked_belts is null
        AND belts > 0
        AND valid = 'Y'
        GROUP BY name
        ORDER BY belts DESC;
        """
        self.getter.execute(query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data

    def get_pay_time_required(self):
        query = f"""
        SELECT
            subquery.name,
            subquery.over_minutes,
            DATE_FORMAT(MAX(u.date), '%y년 %c월 %e일') AS recent_visit_date
        FROM (
            SELECT
                d.name,
                ifnull(SUM(p.minutes), 0) - ifnull(SUM(u.used_minutes), 0) AS over_minutes
            FROM
                dogs d
            LEFT JOIN (
                SELECT name, SUM(minutes) AS minutes
                FROM paid
                WHERE valid = 'Y'
                GROUP BY name
            ) p ON d.name = p.name
            LEFT JOIN (
                SELECT name, SUM(used_minutes) AS used_minutes
                FROM used_table
                WHERE valid = 'Y'
                GROUP BY name
            ) u ON d.name = u.name
            WHERE
                d.name IN (SELECT name FROM dogs)
            GROUP BY
                d.name
            HAVING
                ifnull(SUM(p.minutes), 0) - ifnull(SUM(u.used_minutes), 0) < 0
        ) AS subquery
        LEFT JOIN used_table u ON subquery.name = u.name
        WHERE u.date is not null
        GROUP BY subquery.name
        ORDER BY over_minutes;
        """
        self.getter.execute(query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]
        return data

    def get_all_albums(self):
        query = f"SELECT name, url FROM album WHERE valid = 'Y'"
        self.getter.execute(query)
        columns = [col[0] for col in self.getter.description]
        data = [dict(zip(columns, row)) for row in self.getter.fetchall()]

        return data

    def get_album(self, name):
        try:
            query = f"SELECT name, shared_url FROM album WHERE name = '{name}' AND valid = 'Y'"
            self.getter.execute(query)
            columns = [col[0] for col in self.getter.description]
            data = [dict(zip(columns, row)) for row in self.getter.fetchall()]

            return data[0]
        except:
            return False

    def is_album_exist(self, name):
        query = f"SELECT COUNT(*) FROM album WHERE name = '{name}'"
        self.getter.execute(query)
        result = self.getter.fetchone()

        return result[0] > 0

    def insert_album(self, data):
        name, url, shared_url = data['name'], data['url'], data['shared_url']
        if self.is_album_exist(name):
            query = f"UPDATE album SET url = '{url}', shared_url = '{shared_url}', valid = 'Y' WHERE name = '{name}'"
        else:
            query = f"INSERT INTO album (name, url, shared_url, valid) VALUES ('{name}', '{url}', '{shared_url}', 'Y')"
        self.setter.execute(query)
        self.db.commit()

        return True
