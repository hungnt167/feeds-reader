<?php

namespace App\Http\Controllers;

use App\Channel;
use Illuminate\Http\Request;

/**
 * Class ChannelController
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App\Http\Controllers
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Channel::with(['newsList', 'image'])->get();
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request a request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [];

        foreach (Channel::$xmlFields as $xmlField) {
            $data[$xmlField] = $request->get($xmlField);
        }

        $item = new Channel($data);

        $item->save();
        return response()->json('Successfully added');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id identify
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Channel::with('newsList')->find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id identify
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = Channel::find($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request from client
     * @param int                      $id      identify
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Channel::find($id);

        foreach (Channel::$xmlFields as $xmlField) {
            $value = $request->get($xmlField);
            if (!$value) {
                continue;
            }
            $item->{$xmlField} = $request->get($xmlField);
        }

        $item->save();

        return response()->json('Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id identify
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Channel::find($id);
        $item->delete();

        return response()->json('Successfully Deleted');
    }

    /**
     * Fetch feed from URL
     *
     * @param Request $request include URL to fetch
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $url = $request->get('url');

        if (empty($url)) {
            return response()->json(['error' => 'URL is required!'], 500);
        }

        $channel = Channel::fetchChannel($url);

        if (!$channel) {
            return response()->json(['error' => 'Something wen\'t wrong!'], 500);
        }

        return response()->json('Successfully Fetched');
    }
}
