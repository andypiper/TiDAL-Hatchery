<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="/manifest.json">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="csrfToken" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Hatchery') }}</title>
    <meta name="description" content="A platform to publish and develop software for several electronic badges.">

    <meta name="theme-color" content="#F2DAC7">
    <link rel="icon" type="image/x-icon" sizes="16x16" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="640x640" href="{{ asset('img/bs.png') }}">
    <link rel="apple-touch-icon" sizes="640x640" href="{{ asset('img/bs.png') }}">
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <style>
	.links > a {
		letter-spacing: .1rem;
        margin: 10px;
        width: 142px;
	}

	h1.hatcher {
		font-size: 76px;
		font-weight: 400;
	}
	.table-condensed th {
		text-align: center;
	}
	.spacer { 
		height: 2em;
	}
    </style>

    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
                'csrfToken' => csrf_token(),
            ]) !!};
        @auth
        window.UserId = {{ Auth::user()->id }};
        @endauth
    </script>

</head>
<body>
    @include('partials.messages')
    <picture>
      <source
        srcset="/img/emf-w-logo-circular.png"
        media="(prefers-color-scheme: dark)">
      <img class="logo" src="/img/emf-b-logo-circular.png" alt="Electromagnetic Field">
    </picture>
    @yield('content')
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://badge.team",
  "name": "Badge.Team",
  "logo": "https://badge.team/img/bs.png",
  "foundingDate": "2017",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "support",
    "email": "help@badge.team"
  }
}
    </script>
    <!-- Scripts -->
    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
    <script src="{{ mix('/js/app.js') }}"></script>

    @yield('script')
</body>
</html>
