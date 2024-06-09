import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { LocationService } from '../../Services/location.service';
import { CommonModule } from '@angular/common';
import { LocationDPS } from '../../../Models/location.model';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule],
  providers: [LocationService],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: LocationDPS[] | null = null;
  @Input() selectedLocationId: number | null = null;


  @Output() locationSelected = new EventEmitter<number | null>(); // Тепер передаємо ідентифікатор локації або null

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (locations) => {
        this.locations = locations;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  onSelectLocation(event: Event) {
    const target = event.target as HTMLSelectElement;
    const locationName = target.value;

    if (locationName === '') {
      this.locationSelected.emit(null); // Якщо вибрана опція "Всі", передаємо null
    } else {
      const location = this.locations?.find((loc) => loc.name === locationName);
      if (location) {
        this.locationSelected.emit(location.id);
      }
    }
  }
}
