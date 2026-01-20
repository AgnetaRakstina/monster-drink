@extends('layout')
@section('content')

<h1>{{ $title }}</h1>

@if ($errors->any())
	<div class="alert alert-danger">Lūdzu, novēries radušās kļūdas!</div>
@endif

<form
	method="post"
	action="{{ $drink->exists ? '/drinks/patch/' . $drink->id : '/drinks/put' }}"
	enctype="multipart/form-data">
	@csrf
	
	<div class="mb-3">
		<label for="drink-name" class="form-label">Nosaukums</label>
		<input
			type="text"
			id="drink-name"
			name="name"
			value="{{ old('name', $drink->name) }}"
			class="form-control @error('name') is-invalid @enderror">
		@error('name')
			<p class="invalid-feedback">{{ $errors->first('name') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
		<label for="drink-category" class="form-label">Kategorija</label>
		<select id="drink-category" name="category_id" class="form-select @error('category_id') is-invalid @enderror">
			<option value="">Norādiet kategoriju!</option>
			@foreach($categories as $category)
				<option value="{{ $category->id }}" 
					@if ($category->id == old('category_id', $drink->category_id)) selected @endif>
					{{ $category->name }}
				</option>
			@endforeach
		</select>
		@error('category_id')
			<p class="invalid-feedback">{{ $errors->first('category_id') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
		<label for="drink-collaboration" class="form-label">Sadarbība</label>
		<select id="drink-collaboration" name="collaboration_id" class="form-select @error('collaboration_id') is-invalid @enderror">
			<option value="">Norādiet sadarbību!</option>
			@foreach($collaborations as $collaboration)
				<option value="{{ $collaboration->id }}" 
					@if ($collaboration->id == old('collaboration_id', $drink->collaboration_id)) selected @endif>
					{{ $collaboration->name }}
				</option>
			@endforeach
		</select>
		<small class="text-muted">Atstājiet "Norādiet saradbību", ja nav sadarbības.</small>
		@error('collaboration_id')
			<p class="invalid-feedback">{{ $errors->first('collaboration_id') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
		<label for="drink-origin" class="form-label">Izcelsme</label>
		<select id="drink-origin" name="origin_id" class="form-select @error('origin_id') is-invalid @enderror">
			<option value="">Norādiet izcelsmi!</option>
			@foreach($origins as $origin)
				<option value="{{ $origin->id }}" 
					@if ($origin->id == old('origin_id', $drink->origin_id)) selected @endif>
					{{ $origin->name }}
				</option>
			@endforeach
		</select>
		<small class="text-muted">Atstājiet "Norādiet izcelsmi", ja nav izdots (concept/unreleased).</small>
		@error('origin_id')
			<p class="invalid-feedback">{{ $errors->first('origin_id') }}</p>
		@enderror
	</div>
		
	<div class="mb-3">
		<label for="drink-flavor" class="form-label">Garša</label>
		<input
			type="text"
			id="drink-flavor"
			name="flavor"
			value="{{ old('flavor', $drink->flavor) }}"
			class="form-control @error('flavor') is-invalid @enderror">
		@error('flavor')
			<p class="invalid-feedback">{{ $errors->first('flavor') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
		<label for="drink-caffeine_amount" class="form-label">Kofeīna apmjoms</label>
		<input
			type="number"
			id="drink-caffeine_amount"
			name="caffeine_amount"
			value="{{ old('caffeine_amount', $drink->caffeine_amount) }}"
			class="form-control @error('caffeine_amount') is-invalid @enderror">
		@error('caffeine_amount')
			<p class="invalid-feedback">{{ $errors->first('caffeine_amount') }}</p>
		@enderror
	</div>
		
	<div class="mb-3">
		<label for="drink-released" class="form-label">Izdošanas gads</label>
		<input
			type="number"
			max="{{ date('Y') + 1 }}"
			step="1"
			id="drink-released"
			name="released_in"
			value="{{ old('released_in', $drink->released_in) }}"
			class="form-control @error('released_in') is-invalid @enderror">
		<small class="text-muted">Atstājiet tukšu, ja tas nav izdots (concept/unreleased).</small>
		@error('released_in')
			<p class="invalid-feedback">{{ $errors->first('released_in') }}</p>
		@enderror
	</div>
		
	<div class="mb-3">
		<label for="drink-discontinued" class="form-label">Pārtraukšanas gads</label>
		<input
			type="number"
			max="{{ date('Y') }}"
			step="1"
			id="drink-discontinued"
			name="discontinued_in"
			value="{{ old('discontinued_in', $drink->discontinued_in) }}"
			class="form-control @error('discontinued_in') is-invalid @enderror">
		<small class="text-muted">Atstājiet tukšu, vēl tiek ražots.</small>
		@error('discontinued_in')
			<p class="invalid-feedback">{{ $errors->first('discontinued_in') }}</p>
		@enderror
	</div>
		
	<div class="mb-3">
		<label for="drink-description" class="form-label">Apraksts</label>
		<textarea
			id="drink-description"
			name="description"
			class="form-control @error('description') is-invalid @enderror"
		>{{ old('description', $drink->description) }}</textarea>
		@error('description')
			<p class="invalid-feedback">{{ $errors->first('description') }}</p>
		@enderror
	</div>
	
	<div class="mb-3">
		<div class="form-check">
			<input
				type="checkbox"
				id="book-display"
				name="display"
				value="1"
				class="form-check-input @error('display') is-invalid @enderror"
				@if (old('display', $drink->display)) checked @endif
			>
			<label class="form-check-label" for="book-display">
				Publicēt ierakstu
			</label>
			@error('display')
				<p class="invalid-feedback">{{ @errors->first('display') }}</p>
			@enderror
		</div>
	</div>
	
	<div class="mb-3">
		<label for="drink-image" class="form-label">Attēls</label>
		
		@if ($drink->image)
			<img
				src="{{ asset('images/' . $drink->image) }}"
				class="img-fluid img-thumbnail d-block mb-2"
				alt="{{ $drink->name }}">
		@endif
		
		<input
			type="file"
			id="drink-image"
			name="image"
			class="form-control @error('image') is-invalid @enderror">
		@error('image')
			<p class="invalid-feedback">{{ $errors->first('image') }} </p>
		@enderror
	</div>
		
	<button type="submit" class="btn btn-primary">
		{{ $drink->exists ? 'Atjaunot ierakstu' : 'Pievienot ierakstu' }}
	</button>
		
</form>

@endsection	