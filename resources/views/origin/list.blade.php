@extends('layout')
@section('content')

<h1>{{ $title }}</h1>
	
@if (count($items) > 0)
		
	<table class="table table-striped table-hover table-sm">
		<thead class="thead-light">
			<tr>
				<th>ID</th>
				<th>Nosaukums</th>
				<th>Apraksts</th>
				<th>&nbsp;</th>
			</tr>
		</thead>
		<tbody>
			
		@foreach($items as $origin)
			<tr>
				<td>{{ $origin->id }}</td>
				<td>{{ $origin->name }}</td>
				<td>{{ $origin->description ?? '-' }}</td>
				<td>
					<a href="/origins/update/{{ $origin->id }}"
						class="btn btn-outline-primary btn-sm">Labot</a>

					<form
						method="post"
						action="/origins/delete/{{ $origin->id }}"
						class="d-inline deletion-form">
						@csrf
						<button
							type="submit"
							class="btn btn-outline-danger btn-sm"
						>Dzēst</button>
					</form>
				</td>
			</tr>
		@endforeach
		</tbody>
	</table>
@else
	<p>Nav atrasts neviens ieraksts</p>
@endif

<a href="/origins/create" class="btn btn-primary">Izveidot jaunu</a>

@endsection