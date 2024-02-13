# Server

This is the server for the project. It is a simple web application that provides data to the client.
It's built with Laravel to provide a simple and easy to use API.

## How to run

To run the server, you need to have PHP and Composer installed. You can find the installation instructions in the [official Laravel documentation](https://laravel.com/docs/8.x/installation).
First of all you need to install the dependencies using Composer:

```bash
composer install
```

Then you need to create a `.env` file. You can use the `.env.example` file as a template:

```bash
cp .env.example .env
```

After that you need to generate the application key:

```bash
php artisan key:generate
```

Now you can run the server using the following command:

```bash
php artisan  --port=3000
```

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.
