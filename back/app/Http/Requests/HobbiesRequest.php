<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HobbiesRequest extends FormRequest
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
                        'name' => 'required|max:255|unique:Hobbies,name',
                        'image' => 'required|mimes:jpeg,png,jpg,gif,svg|max:2048',
                 
                    ];
                }
            case 'PUT':
                {

                    return [

                        'name' => 'required|max:255|unique:Hobbies,name,'.$this->id,
                        'image' => 'required|max:2048',

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
            'name.unique'=> 'This hobby is already taken ',

            'image.required' => ' Image is required!',
            'image.max' => 'Image is too larage',
            'image.mimes' => 'Image type is unacceptable',
        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

