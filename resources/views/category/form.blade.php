@extends('layout')
@section('content')
	
	<h1>{{ $title }}</h1>
	
	@if ($errors->any())
		<div class="alert alert-danger">Lūdzu, novērsiet radušās kļūdas!</div>
	@endif
	
	<form 
		method="post"
		action="{{ $category->exists ? '/categories/patch/' . $category->id : '/categories/put' }}"
		enctype="multipart/form-data">
		@csrf
		
		<div class="mb-3">
			<label for = "category-name" class="form-label">Nosaukums</label>
			
			<input
				type = "text"
				id = "category-name"
				name = "name"
				value = "{{ old('name', $category->name) }}"
				class="form-control @error('name') is-invalid @enderror">
			@error('name')
				<p class="invalid-feedback">{{ $errors->first('name') }}</p>
			@enderror
		</div>

		<div class="mb-3">
			<label for="category-monster_amount" class="form-label">Dzērienu skaits</label>
			<input
				type="number"
				id = "monster_amount"
				name="monster_amount"
				value="{{ old('monster_amount', $category->monster_amount) }}"
				class="form-control @error('monster_amount') is-invalid @enderror">
			@error('monster_amount')
				<p class="invalid-feedback">{{ $errors->first('amount') }} </p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="category-average_caffeine_amount" class="form-label">Vidējais kofeīna apjoms</label>
			<input
				type = "number"
				id = "average_caffeine_amount"
				name = "average_caffeine_amount"
				value= "{{ old('average_caffeine_amount', $category->average_caffeine_amount) }}"
				class = "form-control @error('average_caffeine_amount') is-invalid @enderror">
			@error('average_caffeine_amount')
				<p class="invalid-feedback">{{ $errors->first('average_caffeine_amount') }} </p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="category-description" class="form-label">Apraksts</label>
			<input
				type = "text"
				id = "description"
				name = "description"
				value = "{{ old('description', $category->description) }}"
				class="form-control @error('description') is-invalid @enderror">
			@error('description')
				<p class="invalid-feedback">{{ $errors->first('desc') }} </p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="category-image" class="form-label">Attēls</label>
			
			@if ($category->image)
				<img
					src="{{ asset('images/' . $category->image) }}"
					class="img-fluid img-thumbnail d-block mb-2"
					alt="{{ $category->name }}">
			@endif
			
			<input
				type="file"
				id="category-image"
				name="image"
				class="form-control @error('image') is-invalid @enderror">
			@error('image')
				<p class="invalid-feedback">{{ $errors->first('image') }} </p>
			@enderror
		</div>
		
		<button type="submit" class="btn btn-primary">
			{{ $category->exists ? 'Atjaunot kategoriju' : 'Pievienot kategoriju' }}
		</button>
		
	</form>
	
@endsection