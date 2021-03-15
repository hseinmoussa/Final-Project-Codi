<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Events_HobbiesRequest extends FormRequest
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
                        'event_id' => 'required|exists:Events,id',
                       
                    ];
                }
            case 'PUT':
                {

                    return [
                        // 'name' => 'required|max:255|unique:Users_Hobbies,name,'.$this->id,
                        'hobby_id' => 'required|exists:Hobbies,id',
                        'event_id' => 'required|exists:Events,id',
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


            'hobby_id.required' => 'Hobby is required!',
            'hobby_id.exists' => 'Invalid Hobby',

            'event_id.required' => 'Event is required!',
            'event_id.exists' => 'Invalid Event',


        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

