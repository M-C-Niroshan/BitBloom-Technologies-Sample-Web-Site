<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('key_services', function (Blueprint $table) {
            $table->id();
            $table->string('mainTitle');
            $table->timestamps();
        });

        Schema::create('key_service_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('key_service_id')->constrained('key_services')->onDelete('cascade');
            $table->string('caption');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('key_service_items');
        Schema::dropIfExists('key_services');
    }
};