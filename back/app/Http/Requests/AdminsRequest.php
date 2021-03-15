<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminsRequest extends FormRequest
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
                        'email' => 'required|max:255|email|unique:admins,email',
                        'password' => 'required|max:255|min:6',
                        'image' => 'required|mimes:jpeg,png,jpg,gif,svg|max:2048',
                    ];
                }
            case 'PUT':
                {

                    return [
                        'name' => 'required|max:255',
                        'email' => 'required|max:255|email|unique:admins,email,'.$this->id,
                        'password' => 'required|max:255|min:6',
                        'image' => 'required|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            'image.required' => ' Image is required!',
            'image.max' => 'Image is too larage',
            'image.mimes' => 'Image type is unacceptable',
            'email.required' => "The email is required",
            'email.email' => "The email format must be eaxmple@mail.com",
            'email.unique'=> 'This email is already taken ',
            'email.max'=> 'The email is too long',
            'password.required'=> 'The password is required',
            'password.min' => 'the password should be at least 6 charachters',
           
        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

