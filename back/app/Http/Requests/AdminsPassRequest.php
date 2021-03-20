<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminsPassRequest extends FormRequest
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
                        'password' => 'required|max:255|min:6',
                        'verify_password' => 'required|max:255|min:6',
                    ];
                }
            case 'PUT':
                {

                    return [
                        'password' => 'required|max:255|min:6',
                        'verify_password' => 'required|max:255|min:6',
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
        
            'password.required'=> 'The password is required',
            'password.min' => 'the password should be at least 6 charachters',
           
            'verify_password.required'=> 'The Verify password is required',
            'verify_password.min' => 'the Verify password should be at least 6 charachters',

        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

