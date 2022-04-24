import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/models/productosEmpresa.model';
import { sucursales } from 'src/app/models/sucursales.model';
import { productosSucursales } from 'src/app/models/productosSucursal.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProductosEmpresaService } from 'src/app/services/productos-empresa.service';


@Component({
  selector: 'app-productos-empresa',
  templateUrl: './productos-empresa.component.html',
  styleUrls: ['./productos-empresa.component.scss'],
  providers: [ProductosEmpresaService]
})
export class ProductosEmpresaComponent implements OnInit {

  public productosModelGet: productos;
  public productosModelPost: productos;
  public productosModelGetId: productos;
  public sucursalesModelGet: sucursales;
  public productoSucursalModelPut: productosSucursales;
  public token;

  constructor(private _productosService: ProductosEmpresaService, private _dashboardService: DashboardService) {
    this.productosModelPost = new productos('','','',0,'');
    this.productosModelGetId = new productos('','','',0,'');
    this.productoSucursalModelPut = new productosSucursales('', '', 0, 0, '', '')
    this.token = this._productosService.obtenerToken()
  }

  getSucursales(){
    this._dashboardService.obtenerSucursales(this._dashboardService.obtenerToken()).subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;
        console.log(this.sucursalesModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  putEnviarProducto(idProducto){
    this._productosService.enviarProducto(idProducto, this.productoSucursalModelPut, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }


  getProductos(){
    this._productosService.obtenerProductos(this._productosService.obtenerToken()).subscribe(
      (response) => {
        this.productosModelGet = response.productos;
        console.log(this.productosModelGet);
      },
      (error) => {
        console.log(<any>error)
      }
    )
  }

  getProductosId(idProducto){
    this._productosService.obtenerProductoId(idProducto).subscribe(
      (response)=>{
        console.log(response);
        this.productosModelGetId = response.productos;
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  postProductos(){
    this._productosService.agregarProducto(this.productosModelPost, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  putProducto(){
    this._productosService.editarProducto(this.productosModelGetId, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  deleteProductos(idProducto){
    this._productosService.eliminarProducto(idProducto, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  ngOnInit(): void {
    this.getProductos();
  }

}