<?php

namespace App\Console\Commands;

use App\Channel;
use App\News;
use Illuminate\Console\Command;

/**
 * Class FeedsReader
 *
 * PHP Version 7.2.13
 *
 * @category PHP
 * @package  App\Console\Commands
 * @author   hung1 <hungnt167@gmail.com>
 * @license  https://github.com/hungnt167/feeds-reader/LICENSE.txt MIT License
 * @link     https://github.com/hungnt167/feeds-reader
 */
class FeedsReader extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = '
    feeds-reader:run 
    {method}
    {argument?}
    {optionalArgument?}
    {argumentWithDefault=default}
    {--booleanOption}
    {--optionWithValue=}
    {--optionWithValueAndDefault=default}
    ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $method = $this->argument('method');
        if ($method === 'list') {
            $this->listChannel();
            return;
        }

        if ($method === 'get') {
            $this->listNewsOfChannel();
            return;
        }

        if ($method === 'fetch') {
            $this->fetchChannel();
            return;
        }
    }

    /**
     * List Channel Command
     *
     * @return void
     */
    protected function listChannel()
    {
        $this->table(
            Channel::$cliHeaders,
            Channel::all(Channel::$cliColumns)->toArray()
        );
    }

    /**
     * List All News belongs to Channel Command
     *
     * @return void
     */
    protected function listNewsOfChannel()
    {
        $argument = $this->argument('argument');

        if (!$argument) {
            $argument = $this->ask('Channel Id:');
        }

        $channel = Channel::find($argument);

        if (!$channel) {
            $this->error("Channel is not found!");
            return;
        }

        $this->table(
            News::$cliHeaders,
            $channel->newsList()->get(News::$cliColumns)->toArray()
        );
    }

    /**
     * List Channel Command
     *
     * @return void
     */
    protected function fetchChannel()
    {
        $argument = $this->argument('argument');

        if (!$argument) {
            $argument = $this->ask('URL:');
        }

        if (filter_var($argument, FILTER_VALIDATE_URL) === false) {
            $this->error("$argument is not a valid URL");
            return;
        }

        $channel = Channel::fetchChannel($argument);

        if (!$channel) {
            $this->error("Cannot retrieved channel from $argument");
            return;
        }

        $this->table(
            News::$cliHeaders,
            $channel->newsList()->get(News::$cliColumns)->toArray()
        );
    }
}
