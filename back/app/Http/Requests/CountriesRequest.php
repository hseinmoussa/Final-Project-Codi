<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CountriesRequest extends FormRequest
{



    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
       
       
        switch ($this->method()) {
            case 'POST':
                {
                    
                    return [
                        'name' => 'required|max:255',
                        'code' => 'required|max:255',
                    ];
                }
            case 'PUT':
                {

                    return [
                        'name' => 'required|max:255',
                        'code' => 'required|max:255',
                    ];
                }
        }
    }

     /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [

            'name.required' => 'Name is required!',
            'name.max' => 'Name is too long',
            'code.required' => 'Code field is required!',
            'code.max' => 'This Code is too long',
        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

