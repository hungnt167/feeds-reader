<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateChannelsTable
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  NAMESPACE
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class CreateChannelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'channels',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->text('title');
                $table->longText('description')->nullable();
                $table->dateTimeTz('pubDate');
                $table->text('generator');
                $table->text('link');
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channels');
    }
}
