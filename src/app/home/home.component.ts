
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {



  showFullForm = false;
  showFacilityModal = false;
  selectedFacility: any = null;

  facilityDetails: any = {
    sports: {
      title: 'Sports',
      text: 'We offer indoor and outdoor sports facilities including basketball, football, badminton, and athletics tracks, with trained coaches for every activity.',
      video: 'KEaAWUgcx90'

    },
    library: {
      title: 'Library',
      text: 'Our well-stocked library has thousands of books across subjects, along with a quiet reading area and digital resources for students.',
      video:  'pCBmq-R7K7o' 
    },
    swimming: {
      title: 'Swimming',
      text: 'A dedicated aquatic center with trained swimming instructors, ensuring safety and skill-building for students of all ages.',
      video: 'BLmQaFoSCAg'
    },
    labs: {
      title: 'Labs',
      text: 'Fully equipped science, computer, and language labs offering hands-on learning experiences for practical understanding.',
      video: 'ZlS-HTbiYjc'
    }
  };

  openFacility(key: string) {
    const facility = this.facilityDetails[key];
    facility.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + facility.video
    );
    this.selectedFacility = facility;
    this.showFacilityModal = true;
  }
  closeFacility() {
    this.showFacilityModal = false;
  }
  showVideoModal = false;

  openVideoModal() {
    this.showVideoModal = true;
  }

  closeVideoModal() {
    this.showVideoModal = false;
  }
  showInquiryForm = false;
  showContactBox = false;
  showAboutBox = false;
  student = {

    StudentName: '',

    DOB: '',

    Gender: '',

    FatherName: '',

    MotherName: '',

    MobileNumber: '',

    Email: '',

    FullAddress: '',

    SelectClass: ''

  };

  constructor(

    private router: Router,

    private http: HttpClient,

    private sanitizer: DomSanitizer

  ) { }

  submitForm() {

    this.http.post(

      'http://localhost:5138/api/admission',

      this.student

    ).subscribe({

      next: (res) => {
        console.log("Saved Successfully");
        console.log(res);

        alert("Data Saved Successfully");
      },
    });

  }
  submitInquiry() {
    this.http.post(
      'http://localhost:5138/api/inquiry',
      this.inquiry
    ).subscribe({

      next: (res) => {

        console.log("Inquiry Saved", res);

      },

      error: (err) => {
        console.log(err);
        alert(JSON.stringify(err.error, null, 2));
      }

    });
  }
  heroImages: string[] = [
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80'
  ];
  currentImageIndex = 0;
  private heroInterval: any;

  ngOnInit() {
    this.heroInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    }, 4000);
  }

  ngOnDestroy() {
    clearInterval(this.heroInterval);
  }
  openFullForm() {
    this.showFullForm = true;
    this.showInquiryForm = false;
    this.showContactBox = false;
  }

  closeFullForm() {
    this.showFullForm = false;
  }

  openInquiryForm() {

    this.showInquiryForm = true;
    this.showFullForm = false;
    this.showContactBox = false;

  }
  inquiry = {

    StudentName: '',
    Email: '',
    ParentName: '',
    MobileNumber: ''

  };

  closeInquiryForm() {

    this.showInquiryForm = false;

  }

  openContact() {

    this.showContactBox = true;
    this.showFullForm = false;
    this.showInquiryForm = false;

  }

  closeContact() {

    this.showContactBox = false;

  }

  openAbout() {

    this.showAboutBox = true;

  }

  closeAbout() {

    this.showAboutBox = false;

  }

  goToSmartClasses() {

    this.router.navigate(['/smart-classes']);

  }

}