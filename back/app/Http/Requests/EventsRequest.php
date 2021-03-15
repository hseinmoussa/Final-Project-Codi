<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventsRequest extends FormRequest
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
                        'location' => 'required|max:255',
                        'start_date' => 'required|max:255',
                        'end_date' => 'required|max:255',
                        'start_time' => 'required|max:255',
                        'end_time' => 'required|max:255',
                        'city_id' => 'required|exists:Cities,id',
                        'user_id' => 'required|exists:users,id',
                    ];
                }
            case 'PUT':
                {

                    return [

                        'name' => 'required|max:255',
                        'location' => 'required|max:255',
                        'start_date' => 'required|max:255',
                        'end_date' => 'required|max:255',
                        'start_time' => 'required|max:255',
                        'end_time' => 'required|max:255',
                        'city_id' => 'required|exists:Cities,id',
                        'user_id' => 'required|exists:users,id',
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

            'location.required' => 'Location is required!',
            'location.max' => 'Location is too long',

            'start_date.required' => 'Start date is required!',
            'start_date.max' => 'Start date is too long',

            'end_date.required' => 'End date is required!',
            'end_date.max' => 'End date is too long',

            'start_time.required' => 'Start time is required!',
            'start_time.max' => 'Start time is too long',

            'end_time.required' => 'End time is required!',
            'end_time.max' => 'End time is too long',

            'city_id.required' => 'City field is required!',
            'city_id.exists' => 'Invalid City!',

            'user_id.required' => 'User field is required!',
            'user_id.exists' => 'Invalid User!',

            'country_id.required' => 'Country field is required!',
            'country_id.exists' => 'Country field should be real one!',
        ];
    }

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}

