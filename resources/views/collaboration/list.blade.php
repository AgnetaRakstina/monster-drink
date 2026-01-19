@extends('layout')
@section('content')

	<h1>{{ $title }}</h1>
	
	@if (count($items) > 0)
		
		<table class="table table-striped table-hover table-sm">
			<thead class="thead-light">
				<tr>
					<th>ID</th>
					<th>Nosaukums</th>
					<th>Pārtraukts</th>
					<th>Apraksts</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
		
		<tbody>
		
			@foreach($items as $collaboration)
			<tr>
				<td>{{ $collaboration->id }}</td>
				<td>{{ $collaboration->name }}</td>
				<td>{{ $collaboration->collaboration_discontinued_in ?? '-' }}</td>
				<td>{{ $collaboration->description ?? '-' }}</td>
					
				<td> <a href="/collaborations/update/{{ $collaboration->id }}"
						class="btn btn-outline-primary btn-sm">Labot</a>
					<form
						action="/collaborations/delete/{{ $collaboration->id }}"
						method="post"
						class="deletion-form d-inline">
						@csrf
						<button type="submit"
							class="btn btn-outline-danger btn-sm">Dzēst
						</button>
					</form>
				</td>
			</tr>
			@endforeach
				
			</tbody>
		</table>
	@else
		<p>Nav atrasts neviens ieraksts</p>
	@endif
	<a href="/collaborations/create" class="btn btn-primary">Izveidot jaunu</a>
@endsection	

			
		