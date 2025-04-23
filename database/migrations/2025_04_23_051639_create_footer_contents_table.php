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
        Schema::create('footer_contents', function (Blueprint $table) {
            $table->id();
            $table->string('companyName');
            $table->string('leftSideCaption');
            $table->string('facebookURL');
            $table->string('twitterURL');
            $table->string('linkdinURL');
            $table->string('instagramURL');
            $table->string('headquartersAddress');
            $table->string('inquiriesMailAddress');
            $table->string('contactNumber');
            $table->string('bottomCaption');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footer_contents');
    }
};
