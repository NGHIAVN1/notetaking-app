# build image docker for frontend
cd frontend
root_path="/Users/nghiadvh/Project/mern-notetaking-app"
export root_path
val_frontend=$(pwd)
if [ "$val_frontend" == "$root_path/frontend" ]
    then
    docker build -t notetaking-frontend .
else   
    echo "this path not available !!!"
fi

sleep 5s

# build image docker for backend

cd "$root_path/backend"

val_backend=$(pwd)

if [ "$val_backend" == "$root_path/backend" ]
    then
    docker build -t notetaking-backend .
else   
    echo "this path not available !!!"
fi
# package multiple container with docker compose

cd "$root_path"

docker-compose up 2>&1 | tee docker_compose_up.log

if [ $? -ne 0 ]; then
  echo "ERROR: Docker Compose failed. Check docker_compose_up.log"
  exit 1
fi


echo "Docker Compose started successfully."

echo "Deployment completed."