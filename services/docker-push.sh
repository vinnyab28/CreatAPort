# Authenticate
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 785764249189.dkr.ecr.us-east-1.amazonaws.com

# Push each image to ECR
docker push 785764249189.dkr.ecr.us-east-1.amazonaws.com/dalhousie/term-assignment:generator
docker push 785764249189.dkr.ecr.us-east-1.amazonaws.com/dalhousie/term-assignment:save
docker push 785764249189.dkr.ecr.us-east-1.amazonaws.com/dalhousie/term-assignment:signup
docker push 785764249189.dkr.ecr.us-east-1.amazonaws.com/dalhousie/term-assignment:login
docker push 785764249189.dkr.ecr.us-east-1.amazonaws.com/dalhousie/term-assignment:fetchData
