@extends('layout')
@section('content')

<h1>{{ $title }}</h1>

@if ($errors->any())
	<div class="alert alert-danger">Lūdzu, novērsiet radušās kļūdas!</div>
@endif

<form
	method="post"
	action="{{ $origin->exists ? '/origins/patch/' . $origin->id : '/origins/put' }}"
	enctype="multipart/form-data">
	@csrf
	
	<div class="mb-3">
		<label for="origin-name" class="form-label">Nosaukums</label>
		<input
			type="text"
			id="origin-name"
			name="name"
			value="{{ old('name', $origin->name) }}"
			class="form-control @error('name') is-invalid @enderror">
		@error('name')
			<p class="invalid-feedback">{{ $errors->first('name') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
		<label for="origin-description" class="form-label">Apraksts</label>
		<textarea
			id="origin-description"
			name="description"
			class="form-control @error('description') is-invalid @enderror"
		>{{ old('description', $origin->description) }}</textarea>
		@error('description')
			<p class="invalid-feedback">{{ $errors->first('description') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
			<label for="origin-image" class="form-label">Attēls</label>

			@if ($origin->image)
				<img
					src="{{ asset('images/' . $origin->image) }}"
					class="img-fluid img-thumbnail d-block mb-2"
					alt="{{ $origin->name }}">
			@endif

			<input
				type="file"
				id="origin-image"
				name="image"
				class="form-control @error('image') is-invalid @enderror">
			@error('image')
				<p class="invalid-feedback">{{ $errors->first('image') }}</p>
			@enderror
		</div>
	
	<button type="submit" class="btn btn-primary">
		{{ $origin->exists ? 'Atjaunot' : 'Pievienot' }}
	</button>

</form>

@endsection