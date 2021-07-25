function compilePathString(path){
    string = '';
    // Loop over point groups
    for(group=0;group<path.length;group++){
        // Loop over points
        type = path[group][0].type;
        string += type+" ";
        for(point=0;point<path[group].length;point++){
            coordinates = path[group][point];
            string += coordinates.x+","+coordinates.y+" ";
        }
    }
    return string;
}

function addPoint(x,y,path,r=default_point_rad){
    if(path.length == 0){
        path.push(
            [
                {
                    type: "M",
                    x: x,
                    y: y
                }
            ]
        );
        number_of_new_points = 1;
    }else{
        path.push(
            [
                {
                    type: "C",
                    x: x,
                    y: y
                },
                {
                    x: x,
                    y: y
                },
                {
                    x: x,
                    y: y
                }
            ]
        );
        number_of_new_points = 3;
    }
    for(i=0;i<number_of_new_points;i++){
        total_points++;
        color = 'black'
        if(i == 2){
            color = 'green'
        }
        if(number_of_new_points == 1){
            color = 'blue'
        }
        newCircle = document.createElementNS(svgns, "circle");
        newCircle.setAttribute('id', total_points);
        newCircle.setAttribute('data-point_group', point_group);
        newCircle.setAttribute('data-point_index', i);
        newCircle.setAttribute('class', 'draggable');
        newCircle.setAttribute('fill', color);
        newCircle.setAttribute('cx', x);
        newCircle.setAttribute('cy', y);
        newCircle.setAttribute('r', r);
        svg.appendChild(newCircle);
    }
    point_group++;
}


function createPath(path){
    newPath = document.createElementNS(svgns, "path");
    newPath.setAttribute('id', 'path');
    newPath.setAttribute('d', compilePathString(path));
    newPath.setAttribute('fill', 'grey');
    svg.insertBefore(newPath, svg.firstChild);
}

function updatePoint(path, selectedElement, x, y){
    document.querySelectorAll('.tempoint').forEach(e => e.remove());
    pathElement = svg.getElementById('path');
    point_group = selectedElement.getAttribute('data-point_group');
    point_index = selectedElement.getAttribute('data-point_index');
    path[point_group][point_index].x = x;
    path[point_group][point_index].y = y;
    pathElement.setAttribute('d', compilePathString(path));
    
    // Add the cool points evently spaced
    var divisor = 10;
    var pathLength = pathElement.getTotalLength();
    var segmentLength = pathLength/divisor;
    for(i=0;i<divisor;i++){
        coors = pathElement.getPointAtLength(segmentLength*i);
        simple_circle(coors.x,coors.y);
    }
}

function simple_circle(x,y){
    newCircle = document.createElementNS(svgns, "circle");
    newCircle.setAttribute('fill', 'aquamarine');
    newCircle.setAttribute('cx', x);
    newCircle.setAttribute('cy', y);
    newCircle.setAttribute('class', 'tempoint');
    newCircle.setAttribute('r', '3');
    svg.appendChild(newCircle);
}

function createDefaultSword(path){
    var svgRect = svg.getBoundingClientRect()
    var middle_x = (svgRect.width-svgRect.x)/2;
    addPoint(middle_x,10, path);
    addPoint(middle_x-60,80, path);
    addPoint(middle_x-30,180, path);
    addPoint(middle_x-30,400, path);
    addPoint(middle_x+30,400, path);
    addPoint(middle_x+30,180, path);
    addPoint(middle_x+60,80, path);
    createPath(path);
}
