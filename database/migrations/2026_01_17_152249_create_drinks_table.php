<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('drinks', function (Blueprint $table) {
            $table->id();
			$table->foreignId('category_id')->nullable();
			$table->foreignId('collaboration_id')->nullable();
			$table->foreignId('origin_id')->nullable();
			$table->foreignId('theme_id')->nullable();
			$table->string('name', 256);
			$table->string('image', 256)->nullable();
			$table->string('flavor', 256);
			$table->integer('caffeine_amount');
			$table->integer('released_in')->nullable();
			$table->integer('discontinued_in')->nullable();
			$table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drinks');
    }
};
