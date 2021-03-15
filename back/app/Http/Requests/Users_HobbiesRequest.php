<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Users_HobbiesRequest extends FormRequest
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
                        // 'name' => 'required|max:255|unique:Users_Hobbies,name',
                        'hobby_id' => 'required|exists:Hobbies,id',
                        'user_id' => 'required|exists:users,id',
                        'city_id' => 'required|exists:Cities,id',
                        'level_id' => 'required',
                        'address' => 'required|max:255',
                    ];
                }
            case 'PUT':
                {

                    return [
                        // 'name' => 'required|max:255|unique:Users_Hobbies,name,'.$this->id,
                        'hobby_id' => 'required|exists:Hobbies,id',
                        'user_id' => 'required|exists:users,id',
                        'city_id' => 'required|exists:Cities,id',
                        'level_id' => 'required',
                        'address' => 'required|max:255',
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

            'hobby_id.required' => 'Hobby is required!',
            'hobby_id.exists' => 'Invalid Hobby',

            'user_id.required' => 'User is required!',
            'user_id.exists' => 'Invalid User',

            'city_id.required' => 'City is required!',
            'city_id.exists' => 'Invalid City',

            'level_id.required' => 'Level is required!',

            'address.required' => 'Address is required!',
            'address.max' => 'Address is too long',

        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

