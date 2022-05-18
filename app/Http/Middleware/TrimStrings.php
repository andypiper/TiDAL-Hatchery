<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as BaseTrimmer;

/**
 * Class TrimStrings.
 *
 * @author annejan@badge.team
 */
class TrimStrings extends BaseTrimmer
{
    /**
     * The names of the attributes that should not be trimmed.
     *
     * @var array<string>
     */
    protected $except = [
        'current_password',
        'password',
        'password_confirmation',
    ];
}
