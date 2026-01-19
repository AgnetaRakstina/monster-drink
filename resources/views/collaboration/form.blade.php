@extends('layout')
@section('content')
	
	<h1>{{ $title }}</h1>
	
	@if ($errors->any())
		<div class="alert alert-danger">Lūdzu, novērsiet radušās kļūdas!</div>
	@endif
	
	<form 
		method="post"
		action="{{ $collaboration->exists ? '/collaborations/patch/' . $collaboration->id : '/collaborations/put' }}"
		enctype="multipart/form-data">
		@csrf
		
		<div class="mb-3">
			<label for="collaboration-name" class="form-label">Nosaukums</label>
			<input
				type="text"
				id="collaboration-name"
				name="name"
				value="{{ old('name', $collaboration->name) }}"
				class="form-control @error('name') is-invalid @enderror">
			@error('name')
				<p class="invalid-feedback">{{ $errors->first('name') }}</p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="collaboration-discontinued" class="form-label">Pārtraukšanas gads</label>
			<input
				type="number"
				max="{{ date('Y') }}"
				step="1"
				id="collaboration-discontinued"
				name="collaboration_discontinued_in"
				value="{{ old('collaboration_discontinued_in', $collaboration->collaboration_discontinued_in) }}"
				class="form-control @error('collaboration_discontinued_in') is-invalid @enderror">
			<small class="text-muted">Atstājiet tukšu, ja vēl aktīva.</small>
			@error('collaboration_discontinued_in')
				<p class="invalid-feedback">{{ $errors->first('collaboration_discontinued_in') }}</p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="collaboration-description" class="form-label">Apraksts</label>
			<textarea
				id="collaboration-description"
				name="description"
				class="form-control @error('description') is-invalid @enderror"
			>{{ old('description', $collaboration->description) }}</textarea>
			@error('description')
				<p class="invalid-feedback">{{ $errors->first('description') }}</p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="collaboration-image" class="form-label">Attēls</label>

			@if ($collaboration->image)
				<img
					src="{{ asset('images/' . $collaboration->image) }}"
					class="img-fluid img-thumbnail d-block mb-2"
					alt="{{ $collaboration->name }}">
			@endif

			<input
				type="file"
				id="collaboration-image"
				name="image"
				class="form-control @error('image') is-invalid @enderror">
			@error('image')
				<p class="invalid-feedback">{{ $errors->first('image') }}</p>
			@enderror
		</div>
		
		<button type="submit" class="btn btn-primary">
			{{ $collaboration->exists ? 'Atjaunot sadarbību' : 'Pievienot sadarbību' }}
		</button>
	</form>
@endsection