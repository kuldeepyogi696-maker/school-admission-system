import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

const ADMISSION_URL = 'http://localhost:5138/api/admission';
const INQUIRY_URL = 'http://localhost:5138/api/inquiry';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'admissions' | 'inquiries' = 'admissions';

  admissions: any[] = [];
  inquiries: any[] = [];

  loading = false;
  errorMessage = '';

  editingId: number | null = null;
  editForm: any = {};

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAdmissions();
    this.loadInquiries();
  }

  loadAdmissions() {
    this.loading = true;
    this.http.get<any[]>(ADMISSION_URL).subscribe({
      next: (data) => {
        this.admissions = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load admissions';
        this.loading = false;
      },
    });
  }

  loadInquiries() {
    this.http.get<any[]>(INQUIRY_URL).subscribe({
      next: (data) => {
        this.inquiries = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load inquiries';
      },
    });
  }

  setTab(tab: 'admissions' | 'inquiries') {
    this.activeTab = tab;
  }

  startEdit(student: any) {
    this.editingId = student.id;
    this.editForm = { ...student };
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = {};
  }

  saveEdit(id: number) {
    this.http.put(`${ADMISSION_URL}/${id}`, this.editForm).subscribe({
      next: () => {
        this.editingId = null;
        this.loadAdmissions();
      },
      error: () => {
        this.errorMessage = 'Failed to update record';
      },
    });
  }

  deleteAdmission(id: number) {
    const confirmed = confirm('Kya aap sach mein ye record delete karna chahte ho?');
    if (!confirmed) return;

    this.http.delete(`${ADMISSION_URL}/${id}`).subscribe({
      next: () => {
        this.loadAdmissions();
      },
      error: () => {
        this.errorMessage = 'Failed to delete record';
      },
    });
  }

  deleteInquiry(id: number) {
    const confirmed = confirm('Kya aap sach mein ye inquiry delete karna chahte ho?');
    if (!confirmed) return;

    this.http.delete(`${INQUIRY_URL}/${id}`).subscribe({
      next: () => {
        this.loadInquiries();
      },
      error: () => {
        this.errorMessage = 'Failed to delete inquiry';
      },
    });
  }
  // naye properties (editingId ke bagal mein add karo)
  editingInquiryId: number | null = null;
  editInquiryForm: any = {};

  // naye methods (deleteInquiry method ke niche add karo)
  startInquiryEdit(item: any) {
    this.editingInquiryId = item.id;
    this.editInquiryForm = { ...item };
  }

  cancelInquiryEdit() {
    this.editingInquiryId = null;
    this.editInquiryForm = {};
  }

  saveInquiryEdit(id: number) {
    this.http.put(`${INQUIRY_URL}/${id}`, this.editInquiryForm).subscribe({
      next: () => {
        this.editingInquiryId = null;
        this.loadInquiries();
      },
      error: () => {
        this.errorMessage = 'Failed to update inquiry';
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}