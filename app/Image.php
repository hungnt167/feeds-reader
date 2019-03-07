<?php

namespace App;

/**
 * Class Image
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class Image extends AppModel
{
    protected $fillable = [
        'title',
        'url',
        'link',
        'channel_id',
    ];

    protected static $xmlFields = [
        'title',
        'url',
        'link',
    ];

    public static $identifyKeyName = 'title';
    public static $foreignKeyName = 'channel_id';
    /**
     *  Get Parent channel
     *
     * @return mixed
     */
    public function channel()
    {
        return $this->belongsTo('App\Channel');
    }
}
