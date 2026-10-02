import React, { Suspense } from 'react';
import Resetpasswordform from './Resetpasswordform';

const ResetPasswordPage = () => {
    return (
        <div>
            <h2>Reset Password</h2>
            <Suspense fallback="Loading...">
                <Resetpasswordform/>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;