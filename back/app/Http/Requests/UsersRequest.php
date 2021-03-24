<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsersRequest extends FormRequest
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
                        'email' => 'required|email|max:255|unique:users',
                        'image' => 'required|mimes:jpeg,png,jpg,gif,svg|max:2048',
                        'password' => 'required|min:6',
                        'phone' => 'required|min:6',
                        'gender' => 'required',
                        'age' => 'required|integer',

                    ];
                }
            case 'PUT':
                {

                    return [

                        'name' => 'required|max:255',
                        'email' => 'required|email|max:255|unique:users,email,'.$this->id,
                        'image' => 'required',
                        'phone' => 'required|min:6',
                        'gender' => 'required',
                        'age' => 'required|integer',
                        'password' => 'min:6',

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
            'phone.min' => 'the Phone should be at least 6 charachters',
            'phone.required'=> 'The phone nb is required',
            'gender.required'=> 'The gender is required',
            'age.required'=> 'The age is required',

            
        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

