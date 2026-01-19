@extends('layout')
@section('content')

<h1>{{ $title }}</h1>

@if (count($items) > 0)
	
	<table class="table table-sm table-hover table-striped">
		<thead class="thead-light">
		<tr>
			<th>ID</th>
			<th>Nosaukums</th>
			<th>Kategorija</th>
			<th>Sadarbība</th>
			<th>Izcelsme</th>
			<th>Garša</th>
			<th>Kofeīns</th>
			<th>Izlaists</th>
			<th>Pārtraukts</th>
			<th>Apraksts</th>
			<th>&nbsp;</th>
		</tr>
		</thead>
		<tbody>
	
		@foreach($items as $drink)
			<tr>
				<td>{{ $drink->id }}</td>
				<td>{{ $drink->name }}</td>
				<td>{{ $drink->category?->name ?? '-' }}</td>
				<td>{{ $drink->collaboration?->name ?? '-' }}</td>
				<td>{{ $drink->origin?->name ?? '-' }}</td>
				<td>{{ $drink->flavor }}</td>
				<td>{{ $drink->caffeine_amount }} mg</td>
				<td>{{ $drink->released_in ?? '-' }}</td>
				<td>{{ $drink->discontinued_in ?? '-' }}</td>
				<td>{{ $drink->description ?? '-' }}</td>
				<td>{!! $drink->display ? '&#x2714;' : '&#x274C;' !!}</td>

				<td>
					<a href="/drinks/update/{{ $drink->id }}"
						class="btn btn-outline-primary btn-sm">Labot</a>
					<form 
						method="post"
						action="/drinks/delete/{{ $drink->id }}"
						class="d-inline deletion-form">
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

<a href="/drinks/create" class="btn btn-primary">Pievienot jaunu</a>

@endsection
