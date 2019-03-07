<?php

namespace App\Http\Controllers;

use App\News;
use Illuminate\Http\Request;

/**
 * Class NewsController
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App\Http\Controllers
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = News::all();
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

        foreach (News::$xmlFields as $xmlField) {
            $data[$xmlField] = $request->get($xmlField);
        }

        $item = new News($data);
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
        return response()->json(News::with('channel')->find($id));
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
        $item = News::find($id);
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
        $item = News::find($id);

        foreach (News::$xmlFields as $xmlField) {
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
        $ids = explode(",", $id);
        // call delete on the query builder (no get())
        News::whereIn('id', $ids)->delete();

        return response()->json('Successfully Deleted');
    }
}
