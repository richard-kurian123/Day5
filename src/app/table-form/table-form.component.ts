
import {
    Component,
    OnInit
  } from '@angular/core';
  import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
  } from '@angular/forms';
  import {
    DataService
  } from '../data.service';
  
  @Component({
    selector: 'app-table-form',
    templateUrl: './table-form.component.html',
    styleUrls: ['./table-form.component.scss']
  })
  export class TableFormComponent implements OnInit {
  
    public empForm!: FormGroup;
  
    public localData: any;
  
    public combRes: any = [];
  
    public projects: any = [];
    public employees: any = [];
    public employeeProject: any = [];
    public employeeDetails: any = [];
  
    public EmpData: any = [];
  
    //array for pushing to local variable
    public formDataArray: any = [];
  
    public localStorageData: any;
  
    constructor(private formBuilder: FormBuilder, private dataService: DataService) {}
  
    ngOnInit(): void {
  
      this.getEmpForm();
      this.gettingData();
      this.dataRetrive();
    }
  
  
    public getEmpForm() {
  
      this.empForm = this.formBuilder.group({
  
        id: ['', [Validators.required,Validators.pattern('[0-9]*')]],
        name: ['', [Validators.required]],
        designation: ['', [Validators.required]],
        department: ['', [Validators.required]],
        project: this.formBuilder.array([
          new FormControl(null, [Validators.required])
        ]),
  
  
      })
    }
  
    addProject() {
  
      const control = new FormControl(null, [Validators.required]);
      ( < FormArray > this.empForm.get('project')).push(control);
    }
  
    get projectControls() {
      return ( < FormArray > this.empForm.get('project')).controls;
    }
  
    public onSubmit() {
      const formValues = this.empForm.value;
  
      console.log(formValues);
      this.formDataArray.push(formValues);
      console.log("form data array", this.formDataArray);
      localStorage.setItem("formData", JSON.stringify(this.formDataArray));  
      this.empForm.reset();
    
    }
  
    public gettingData() {
  
      this.dataService.getData().subscribe((results: any) => {
        this.employees = results[0];
  
        this.employees = this.employees.employees;
        this.projects = results[1];
        this.projects = this.projects.projects;
        this.employeeProject = results[2];
        this.employeeProject = this.employeeProject.employeeProject
        this.employeeDetails = results[3];
        this.employeeDetails = this.employeeDetails.employeeDetails;
        this.combRes = results;
      })
      this.apiDataComparison();
    }
  
    public dataRetrive() {
  
      this.localStorageData = localStorage.getItem('formData');
      this.formDataArray = JSON.parse(this.localStorageData);
    }
  
    public apiDataComparison(){
  
      this.employeeDetails.forEach((detail:any)=>{
         this.employees.forEach((item:any)=>{
          if(item.id === detail.empId){
            Object.assign(item,{designation:detail.designation,department:detail.department})
          }
         })
  
      })
      console.log("from apiDataCOmpareFUnction", this.employees);
      
  
    }
  
  }
  