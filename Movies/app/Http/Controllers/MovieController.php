<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movie = Movie::all();
        return response()->json([
            'status'=>200,
            'movie'=>$movie
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'actor' => 'required',
        ]);
        Movie::create($request->all());
        return response()->json([
            'status'=>200,
            'message'=>'Movie Added Successfully'
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $movie = Movie::find($id);
        if(is_null($movie)){
            return response()->json(['message'=> 'Movie not found'],404);
        }else{
            return $movie;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);
        if(is_null($movie)){
            return response()->json(['message'=> 'Movie not found'],404);
        }else{
            $movie->update($request->all());
            return $movie;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $movie = Movie::find($id);
        if(is_null($movie)){
            return response()->json(['message'=>'movie not found'],404);
        }else{
        Movie::destroy($id);
        return response()->json([
            'status' => 200,
            'message'=>'Movie '.$id  .' has been deleted'
        ]);

        }
    }
}
