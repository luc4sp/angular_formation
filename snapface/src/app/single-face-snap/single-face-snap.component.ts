import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model'
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  title!: string;
  description!: string;
  createdDate!: Date;
  snaps!: number;
  imageUrl!: string;
  buttonText!: string;
  faceSnap!: FaceSnap;

  constructor(private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.title = 'Archibald';
    this.description = 'Mon meilleur ami depuis tout petit !';
    this.createdDate = new Date();
    this.snaps = 6;
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
    this.buttonText = 'Oh Snap!';
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
  }

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
        this.buttonText = 'Oops, unSnap!';
    } else {
        this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
        this.buttonText = 'Oh Snap!';
    }
  }
}
