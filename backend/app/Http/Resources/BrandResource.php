<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [

            'brand_name' => ucfirst($this->brand_name),
            'id' => $this->id,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'rating' => $this->rating,
            'brand_image' => $this->brand_image,
            'description' => $this->description,




        ];
    }
}
