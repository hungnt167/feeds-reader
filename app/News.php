<?php

namespace App;


/**
 * Class News
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class News extends AppModel
{
    protected $fillable = [
        'title',
        'description',
        'pubDate',
        'link',
        'guid',
        'comments',
        'channel_id',
    ];

    protected $casts = [
        'pubDate' => 'datetime:D, d M y g:i A' //Carbon::RFC822,
    ];

    public static $xmlFields = [
        'title',
        'description',
        'pubDate',
        'link',
        'guid',
        'comments',
    ];
    public static $identifyKeyName = 'title';
    public static $foreignKeyName = 'channel_id';
    public static $cliHeaders = ['Id', 'Title', 'Published Date'];
    public static $cliColumns = ['id', 'title', 'pubDate'];
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
