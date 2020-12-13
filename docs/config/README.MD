# BlocksHub Web Backend Config
All BlocskHub configuration data is stored in a file called `config.json` (or, if using `blockshub/deploy`, then `config/config.web-backend.json` for production data).

This file will go over the general configuration

## Config
```json5
{
    // ALl MySQL DB data
    "mysql": {
        "host": "127.0.0.1",
        "user": "username",
        "password": "password",
        "database": "database_name",
        "charset": "utf8"
    },
    // The Base URL for various services
    // In development, I edited my windows hosts file to forward *.blockshub.hh to localhost, however, if you don't want to do that then you can just use localhost
    "baseUrl": {
        // Backend (aka this services') BASE url
        // For example: https://api.blockshub.net
        "backend": "http://api.blockshub.hh:3000",
        // Frontend (blockshub/web-frontend) API Proxy Base Url
        // For example: https://api.blockshub.net in production, or localhost:3000 in development
        "frontend": "http://api.blockshub.hh:3000",
        // Game Client (blockshub/game-client) BASE url
        // For example: https://play.blockshub.net
        "play": "http://play.blockshub.hh:3006",
        // WWW Base Url
        // For example: https://www.blockshub.net
        "www": "http://www.blockshub.hh:3005"
    },
    // If MySQL TLS is enabled
    "mysqlTLS": {
        "enabled": false
    },
    // Redis configuration information
    "redis": {
        "host": "127.0.0.1"
    },
    // Render server configuration
    "render": {
        "url": "http://localhost:70/renderlib/src/php/index.php",
        "key": "key1234"
    },
    // Avatar Render CDN Information
    "cdn": {
        "port": 70,
        "tls": false,
        "host": "127.0.0.1",
        "key": "post_key",
        "getKey": "get_key"
    },
    // Aws S3 configuration information
    // Note that AWS S3 compatible storage is supported
    "aws": {
        "endpoint": "https://ewr1.vultrobjects.com",
        "accessKeyId": "access_key",
        "secretAccessKey": "secret_key",
        // The names of your buckets
        "buckets": {
            // Name of the thumbnail bucket
            // (where thumbnails are stored, publicly accessible)
            "thumbnails": "blockshub_thumbnails",
            // Name of the assets bucket
            // (where assets like images and hats are stored, private)
            "assets": "blockshub_assets",
            // Name of the game bucket
            // (Where game scripts, etc, are stored, private)
            "game": "blockshub_game"
        }
    },
    // Recaptcha configuration
    "recaptcha": {
        // reCaptcha V3 Config
        "v3": {
            "public": "public_key_v3",
            "private": "private_key_v3"
        },
        "v2": {
            "public": "public_key_v2",
            "private": "private_key_vb2"
        }
    },
    // Session configuration
    "session": {
        // The secret to use
        "secret": "dev_session_one",
        // Is secure flag sent? (aka is the domain https)
        "secure": false,
        // Domain to use
        "domain": ".blockshub.hh"
    },
    // Recaptcha V2 private key (legacy)
    // Should be equal to recaptchg.v2.public
    "captchaKey": {
        "private": "public_key_v2"
    },
    // Encryption keys
    "encryptionKeys": {
        // Email encryption key
        "email": "random_string_here",
        // Password encrypted hash encryption key (passwords are stored like "plaintext => hash => encrypted hash")
        "password": "random_string_here",
        // IP encryption key
        "ip": "random_string_here",
        // Payment information encryption key
        "payments": "random_string_here",
        // Game scripts encryption key
        "game": "random_string_here"
    },
    // PayPal configuration information
    "paypal": {
        // Is this a sandbox environment?
        "sandbox": true,
        // Paypal Rest Email
        "email": "hello@business.example.com",
        // Paypal Reset Client Key
        "clientid": "client_key",
        // Paypal Secret
        "secret": "sercret_key"
    },
    // Coinpayments Configuration
    "coinpayments": {
        // Array of acceded Currencies
        // ID is the ID used by coinpayments, while name is the name shown to people on the checkout page
        "currency": [
            {
                "id": "LTCT",
                "name": "Litcoin Testnet"
            },
            {
                "id": "BTC",
                "name": "Bitcoin"
            }
        ],
        // Coinpayments public & private
        "public": "public_key",
        "private": "private_key",
        // This must be a production url due to how coinpayments works.
        // Replace "example.com" with your API backend domain
        // If this is just a development server, you should leave it empty
        "ipn": "https://example.com/api/v1/billing/currency/ipn",
        // Coinpayments IPN Secreet
        "ipnSecret": "secret_key"
    },
    // JWT Secrts
    "jwt": {
        // 2FA Login
        "twoFactor": "twofactor_secret",
        // Authentication service for third party auth
        "authenticationService": "auth_secret",
        // Game authentication secret (for gameauth)
        "gameAuthentication": "game_secret",
        // Image proxy URL generator secret
        "imageProxy": "image_proxy"
    },
    // Mailjet Configuration
    "mailJet": {
        // Mailjet Public Key
        "public": "public_key",
        // Mailjet private key
        "private": "private_key"
    },
    // IP Quality Score Setup
    "ipQualityScore": {
        // API Key
        "apiKey": "api_key"
    },
    // Is debug enabled?
    "debug": false
}
```