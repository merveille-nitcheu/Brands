<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('countries')->insert([
            [
                'country_name' => 'Venezuela',
                'iso_code' => 'VE'
            ],
            [
                'country_name' => 'Colombia',
                'iso_code' => 'CO'
            ],
            [
                'country_name' => 'Argentina',
                'iso_code' => 'AR'
            ],
            [
                'country_name' => 'Peru',
                'iso_code' => 'PE'
            ],
            [
                'country_name' => 'Chile',
                'iso_code' => 'CL'
            ],
            [
                'country_name' => 'France',
                'iso_code' => 'FR'
            ],
            [
                'country_name' => 'Germany',
                'iso_code' => 'DE'
            ],
            [
                'country_name' => 'United States',
                'iso_code' => 'US'
            ],
            [
                'country_name' => 'Cameroon',
                'iso_code' => 'CM'
            ],
            [
                'country_name' => 'Canada',
                'iso_code' => 'CA'
            ],
            [
                'country_name' => 'Brazil',
                'iso_code' => 'BR'
            ],
            [
                'country_name' => 'Mexico',
                'iso_code' => 'MX'
            ],
            [
                'country_name' => 'Italy',
                'iso_code' => 'IT'
            ],
            [
                'country_name' => 'Spain',
                'iso_code' => 'ES'
            ],
            [
                'country_name' => 'United Kingdom',
                'iso_code' => 'GB'
            ],

        ]);


        DB::table('brands')->insert([
            ['brand_name' => 'Adidas',
            'brand_image' => 'https://brandlogos.net/wp-content/uploads/2014/10/Adidas-logo.png',
            'description' => 'marque de calzado.',
            'rating' => 2,
            'country_id' => 1
            ],
            ['brand_name' => 'Nike',
            'brand_image' => 'https://brandlogos.net/wp-content/uploads/2014/10/Adidas-logo.png',
            'description' => 'marque de calzado.',
            'rating' => 3,
            'country_id' => 4
            ],
            ['brand_name' => 'Puma',
            'brand_image' => 'https://brandlogos.net/wp-content/uploads/2014/10/Adidas-logo.png',
            'description' => 'marque de calzado.',
            'rating' => 4,
            'country_id' => 5
            ],
            ['brand_name' => 'Reebok',
            'brand_image' => 'https://brandlogos.net/wp-content/uploads/2014/10/Adidas-logo.png',
            'description' => 'marque de calzado.',
            'rating' => 5,
            'country_id' => 6
            ]
        ]);
    }
}
