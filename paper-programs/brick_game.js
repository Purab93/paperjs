var tool1, user_angle = 0;
paper.install(window);

$(document).ready(function () {
    paper.setup('myCanvas');
    $("#submit").click(function () {
        var angle = document.getElementById("angle").value;
        if (angle > 45 || angle < 30) {
            alert("Incorrect angle Input");
        }
        else {
            user_angle = angle;
        }
    });
    var rectangle = new Rectangle(new Point(250, 390), new Point(350, 400)),
            cornerSize = new Size(20, 20),
            path_rect = new Path.RoundRectangle(rectangle, cornerSize),
            bool_start = 0,
            pos_top = 1,
            pos_bottom = 0,
            pos_left = 1,
            ball = 1,
            pos_right = 0,
            count = 0;

    path_rect.fillColor = 'red';
    var vector = new Point({ angle: user_angle,
        length: 10
    });
    tool1 = new Tool();
    create = function () {
        var pt = new Point(300, 380)
        var circle = new Path.Circle(pt, 10);
        circle.fillColor = 'pink';
        return circle;
    }

    var circle = create();

    tool1.onKeyDown = function (event) {
        if (Key.isDown('right') && path_rect.position.x <= 540) {
            path_rect.position.x += 20
        }
        if (Key.isDown('left') && path_rect.position.x >= 60) {
            path_rect.position.x -= 20
        }
        if (Key.isDown('space')) {
            bool_start = 1;
        }
        if (ball === 1) {

            if (Key.isDown('n')) {
                if ((count * 10) < 370) {
                    path_rect.position.x = 300;
                    circle = create();
                    ball = 0;
                    wall(count);
                    count += 1;
                }
                else {
                    wall(count);
                    var text = new PointText(new Point(250, 200));
                    text.justification = 'center';
                    text.fillColor = 'black';
                    text.content = 'GAME OVER';
                    text.fontSize = '25px'
                }
            }
        }

    }
    wall = function () {
        var rect_wall = new Rectangle(new Point(0, 0), new Point(610, 10)),
                path_wall = new Path.Rectangle(rect_wall);
        path_wall.fillColor = 'silver';
        path_wall.position.y += (count * 10);
        return path_wall;
    }
    if (count !== 0) {
        var path_wall = wall();
    }


    view.onFrame = function (event) {
    move_ball();
    }
        


function move_ball() {
    if (circle.position.x < 1) {
            pos_left = 0;
            pos_right = 1;
        }
        if (circle.position.x > 599) {
            pos_right = 0;
            pos_left = 1;
        }
        if (circle.position.y < ((count * 10) + 1)) {
            pos_top = 0;
            pos_bottom = 1;
        }
        if (circle.position.y > 399) {
            pos_bottom = 0;
            pos_top = 1;
        }
        if (bool_start === 1 && user_angle !== 0) {
            if (pos_top === 1 && pos_left === 1 && circle.position.x >= 0) {
                vector.angle = user_angle;
                circle.position.x -= vector.x;
                circle.position.y -= vector.y;
            }
            if (pos_top === 1 && pos_right === 1 && circle.position.y >= 0) {
                vector.angle = user_angle;
                circle.position.x += vector.x;
                circle.position.y -= vector.y;
            }
            if (pos_bottom === 1 && pos_right === 1 && circle.position.x <= 600) {
                vector.angle = user_angle;
                circle.position.x += vector.x;
                circle.position.y += vector.y;
            }
            if (pos_bottom === 1 && pos_left === 1 && circle.position.y <= 400) {
                vector.angle = user_angle;
                circle.position.x -= vector.x;
                circle.position.y += vector.y;
            }
        }
        if (circle.intersect(path_rect).length > 0) {
            pos_top = 1;
            pos_bottom = 0;
        }
        else if (circle.position.y >= 400) {
            circle.remove();
            ball = 1;
            bool_start = 0;
        }
    }

});