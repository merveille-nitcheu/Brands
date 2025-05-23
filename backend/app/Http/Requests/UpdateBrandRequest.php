<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            "id" => "required|integer|min:1|exists:brands,id",
            "brand_name" => "required|string|min:2",
            "brand_image" => "nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048",
            "rating" => "nullable|integer|min:0|max:5",
            "description" => "nullable|string|min:2|max:255",

        ];
    }
}
