import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CategoryService } from '../../Services/category.service';
import { CategoryModel } from '../../../Models/category.model';
import { TestListComponent } from '../test-list/test-list.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TestListComponent],
  providers: [CategoryService],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: CategoryModel[] = [];
  expandedCategoryIds: number[] = [];
  isAddingCategory: boolean = false;
  newCategoryName: string = '';
  editingCategoryId: number | null = null;
  editedCategoryName: string = '';

  @Input() testingId: number = 0;

  constructor(private categoryService: CategoryService) {}

  showTests: { [key: number]: boolean } = {};

  toggleTests(category: CategoryModel): void {
      this.showTests[category.id] = !this.showTests[category.id];
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories(this.testingId).subscribe({
      next: (data: CategoryModel[]) => {
        this.categories = data;
        console.log('Fetched categories:', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories!', error);
      }
    });
  }

  isTestsVisible(categoryId: number): boolean {
    return !!this.showTests[categoryId];
  }

  showInputField(): void {
    this.isAddingCategory = true;
  }

  addCategory(): void {
    if (this.newCategoryName.trim()) {
      this.categoryService.addCategory(this.newCategoryName, this.testingId).subscribe({
        next: (category: CategoryModel) => {
          this.categories.push(category);
          this.isAddingCategory = false;
          this.newCategoryName = '';
        },
        error: (error) => {
          console.error('Error adding category!', error);
        }
      });
    }
  }

  cancelAdding(): void {
    this.isAddingCategory = false;
  }

  editCategory(category: CategoryModel): void {
    this.editingCategoryId = category.id;
    this.editedCategoryName = category.name; // Set edited category name
  }

  saveCategory(category: CategoryModel): void {
    if (this.editedCategoryName.trim() && this.editingCategoryId !== null) {
      this.categoryService.updateCategory(category.id, this.editedCategoryName, this.testingId).subscribe({
        next: () => {
          this.editingCategoryId = null;
          console.log(`Updating category with id ${category.id}!`);
          this.loadCategories(); // Оновлюємо дані категорій після успішного збереження
        },
        error: (error) => {
          console.error(`Error updating category with id ${category.id}!`, error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingCategoryId = null;
    this.editedCategoryName = '';
  }

  toggleEdit(category: CategoryModel): void {
    // Перевіряємо, чи редагується вже ця категорія
    if (this.editingCategoryId === category.id) {
      // Якщо так, то зберігаємо зміни
      this.saveCategory(category);
    } else {
      // Інакше починаємо редагування
      this.editCategory(category);
    }
  }

  deleteCategory(categoryId: number): void {
    if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.loadCategories(); // Оновлюємо дані категорій після успішного видалення
        },
        error: (error) => {
          console.error(`Error deleting category with id ${categoryId}!`, error);
        }
      });
    }
  }
}
