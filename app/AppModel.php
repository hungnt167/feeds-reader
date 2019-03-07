<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AppModel
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class AppModel extends Model
{
    protected $primaryKey = 'id';

    protected static $fieldHasRFC822List = [
        "pubDate",
    ];
    protected static $xmlFields = [];

    public static $identifyKeyName = "id";
    public static $foreignKeyName = "parent_id";
    public static $cliHeaders = ['Id'];
    public static $cliColumns = ['id'];


    /**
     * Convert xml type to array
     *
     * @param \SimpleXMLElement $xmlEntity a xml object
     *
     * @return array
     */
    static function parseXmlToArray($xmlEntity)
    {
        $data = array();
        foreach (static::$xmlFields as $field) {
            $value = $xmlEntity->{$field};
            if (is_array($value) || !$value) {
                continue;
            }

            if ($value instanceof \SimpleXMLElement) {
                $value = $value->__toString();
            }

            if (in_array($field, static::$fieldHasRFC822List)) {
                $value = new Carbon($value);
            }

            $data[$field] = $value;
        }
        return $data;
    }

    /**
     *  Create or update from xml object
     *
     * @param \SimpleXMLElement $xmlEntity a xml object
     * @param AppModel|null     $parent    a parent object
     *
     * @return mixed
     */
    static function updateOrCreateFromXml($xmlEntity, $parent)
    {
        $data = static::parseXmlToArray($xmlEntity);

        if ($parent) {
            $data[static::$foreignKeyName] = $parent->{$parent->primaryKey};
        }

        return static::updateOrCreate(
            array(
                static::$identifyKeyName => $xmlEntity->{static::$identifyKeyName}),
            $data
        );
    }
}
