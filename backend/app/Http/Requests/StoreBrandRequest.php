<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array{
        return[
            "brand_name" => "required|string|min:2|max:255",
            "brand_image" => "nullable|string|min:2|max:255",
            "description" => "nullable|string|min:2|max:255",
            "rating" => "nullable|integer|min:1|max:5",

        ]
        ;
    }

}
