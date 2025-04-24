<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteRequest;
use App\Models\Brand;
use App\Http\Resources\BrandResource;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;

class BrandController extends Controller
{
    public function getallbrands()
    {
        try {
            $brands = BrandResource::collection(Brand::latest()->get());

            if ($brands) {
                // Return the list of brands
                return $this->success([
                    "list_brands" => $brands,
                ], "List brands fetched successfully");
            }

            return $this->error("Error while fecthing brand");
        } catch (\Exception $exception) {

            return $this->error($exception->getMessage());
        }
    }


    public function storebrand(StoreBrandRequest $request)
    {
        try {
            $data = $request->validated();
            $brand = Brand::firstOrCreate($data);

            if ($brand) {
                // Return a success message
                return $this->success([
                    "brand" => new BrandResource($brand),
                ], "brand created successfully");
            }
            return $this->error("Error while creating brand");
        } catch (\Exception $exception) {

            return $this->error($exception->getMessage());
        }
    }
    public function updatebrand(UpdateBrandRequest $request)
    {
        try {

            $data = $request->validated();
            $brand = Brand::findOrFail($data['id']);
            if ($brand) {
                $brand->update($data);
                return $this->success([
                    "brand" => new BrandResource($brand),
                ], "brand updated successfully");
            }
            return $this->error("Brand not updated");
        } catch (\Exception $exception) {
            return $this->error($exception->getMessage());
        }
    }

    public function destroybrand(DeleteRequest $request)
    {

        try {
            $data = $request->validated();
            $brand = Brand::findOrFail($data['id']);
            if ($brand) {
                $brand->delete();
                return $this->success("brand deleted successfully");
            }

            return $this->error("Error while deleting brand");
        } catch (\Exception $exception) {

            return $this->error($exception->getMessage());
        }
    }



    public function showbrand(DeleteRequest $request)
    {

        try {
            $data = $request->validated();
            $brand = Brand::findOrFail($data['id']);
            if ($brand) {
                return $this->success([
                    "brand" => new BrandResource($brand),
                ], "brand fecth successfully");
            }

            return $this->error("Error while fetching brand");
        } catch (\Exception $exception) {

            return $this->error($exception->getMessage());
        }
    }
}
