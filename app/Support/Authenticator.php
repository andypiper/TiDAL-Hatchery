<?php

namespace App\Support;

use App\Models\User;
use PragmaRX\Google2FALaravel\Exceptions\InvalidSecretKey;
use PragmaRX\Google2FALaravel\Support\Authenticator as PragmaRXAuthenticator;

/**
 * Class Authenticator.
 *
 * @author annejan@badge.team
 */
class Authenticator extends PragmaRXAuthenticator
{
    /**
     * Check if the 2FA is activated for the user.
     *
     * @throws InvalidSecretKey
     *
     * @return bool
     */
    public function isActivated()
    {
        $secret = $this->getGoogle2FASecretKey();
        /** @var User $user */
        $user = $this->getUser();

        return !is_null($secret) && !empty($secret) && $user->google2fa_enabled;
    }
}
