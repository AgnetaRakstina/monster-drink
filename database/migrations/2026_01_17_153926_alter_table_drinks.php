<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('drinks', function (Blueprint $table) {
			
			$table->foreign('category_id')->references('id')->on('categories');
			$table->foreign('collaboration_id')->references('id')->on('collaborations');
			$table->foreign('origin_id')->references('id')->on('origins');
			
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('drinks', function (Blueprint $table) {
			$table->dropForeign(['category_id']);
			$table->dropForeign(['collaboration_id']);
			$table->dropForeign(['origin_id']);
		});
    }
};
