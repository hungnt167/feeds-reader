<?php

namespace App;


/**
 * Class Channel
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class Channel extends AppModel
{
    protected $fillable = [
        'title',
        'description',
        'pubDate',
        'generator',
        'link',
    ];

    protected $casts = [
        'pubDate' => 'datetime',
    ];
    protected static $xmlFields = [
        'title',
        'description',
        'pubDate',
        'generator',
        'link',
    ];

    public static $identifyKeyName = 'title';
    public static $cliHeaders = ['Id', 'Title', 'URL'];
    public static $cliColumns = ['id', 'title', 'link'];

    /**
     * Get News
     *
     * @return mixed
     */
    public function newsList()
    {
        return $this->hasMany('App\News', 'channel_id');
    }

    /**
     * Get Image
     *
     * @return mixed
     */
    public function image()
    {
        return $this->hasOne('App\Image', 'channel_id');
    }

    /**
     * Get feed from link
     *
     * @param string $url a address
     *
     * @return Channel
     */
    static function fetchChannel($url)
    {
        try {
            $content = file_get_contents($url);
            $xml = new \SimpleXMLElement($content);
        } catch (\ErrorException $exception) {
            return null;
        }

        if (empty($xml->channel)) {
            return null;
        }

        $channel = $xml->channel;

        $channelModel = Channel::updateOrCreate(
            array(static::$identifyKeyName => $channel->{static::$identifyKeyName}),
            static::parseXmlToArray($channel)
        );

        if (empty($channel->image)) {
            return null;
        }

        Image::updateOrCreateFromXml($channel->image, $channelModel);

        if (empty($channel->item)) {
            return null;
        }


        foreach ($xml->channel->item as $item) {
            News::updateOrCreateFromXml($item, $channelModel);
        }

        return $channelModel;
    }
}
