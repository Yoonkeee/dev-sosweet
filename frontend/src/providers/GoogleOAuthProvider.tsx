import type { ReactNode } from 'react';
import { GoogleOAuthProvider as GoogleOAuthProviderFromLib } from '@react-oauth/google';

export const GoogleOAuthProvider = ({ children }: { children: ReactNode }) => (
    <GoogleOAuthProviderFromLib clientId="833281362344-c8phcscrsspsgos4vq1fafn9clet71p0.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProviderFromLib>
  );
