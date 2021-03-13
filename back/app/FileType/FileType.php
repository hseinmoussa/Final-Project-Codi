<?php

namespace App\FileType;

use Illuminate\Support\Facades\Storage;

class FileType
{

    public static function store($file, $folder)
    {
        $path = Storage::disk('public')->put($folder, $file);
        return $path;
    }

    public static function update($file, $folder, $old_path)
    {

        if (!empty($file)) 
        {
            $path = Storage::disk('public')->put($folder, $file);
            if ($path) 
            {
                self::destroy($old_path);
            }

        } else
        {
            $path = $old_path;
        }

        return $path;
    }

    public static function destroy($old_path)
    {
        Storage::disk('public')->delete('/' . $old_path);

    }

}